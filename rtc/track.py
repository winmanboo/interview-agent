import asyncio
import fractions
import logging
import os
import time
from weakref import WeakValueDictionary

import av
import cv2
import numpy as np
from aiortc import MediaStreamTrack
from av import VideoFrame
from av.audio.frame import AudioFrame
from av.frame import Frame
from pydub import AudioSegment

from agent.interview_agent import InterviewStatus
from libs import session_manager
from models.message import DataMessage, Message, MessageType
from paz.pipelines import DetectMiniXceptionFER
from third_party.audio_helper import generate_audio, analyze_audio


class GeneratedAudioTrack(MediaStreamTrack):
    kind = 'audio'

    def __init__(self):
        super().__init__()
        self.queue = asyncio.Queue()
        self.sample_rate = 48000
        self.channels = 1

    async def recv(self):
        if self.queue.empty():
            # 生成静音包避免连接断开
            logging.info('create silence frame')
            return self._create_silence_frame(1024)

        # 从队列获取生成的音频数据
        audio_data = await self.queue.get()
        samples = len(audio_data) // 2  # 每个样本2字节

        # 创建音频帧 - 通过数组形状隐式设置样本数
        # 注意: frame.samples 是只读属性，不能直接设置
        audio_array = np.frombuffer(audio_data, dtype=np.int16)
        frame = av.AudioFrame.from_ndarray(
            audio_array.reshape(1, -1),  # 形状 (channels, samples) 隐式设置样本数
            format='s16',
            layout='mono'
        )
        frame.rate = self.sample_rate
        frame.time_base = fractions.Fraction(1, self.sample_rate)

        # 设置时间戳
        if not hasattr(self, '_timestamp'):
            self._timestamp = 0
        frame.pts = self._timestamp
        self._timestamp += audio_array.size  # 增加总样本数
        logging.info(f'audio frame: {frame}')
        return frame

    def add_audio(self, audio_data: bytes):
        """添加生成的音频数据到队列"""
        self.queue.put_nowait(audio_data)

    def _create_silence_frame(self, sample_count):
        """创建静音帧保持连接"""
        # 修复维度问题：使用二维数组 (channels, samples)
        silence = np.zeros((1, sample_count), dtype=np.int16)
        frame = av.AudioFrame.from_ndarray(
            silence,
            format='s16',
            layout='mono'
        )
        frame.rate = self.sample_rate
        frame.time_base = fractions.Fraction(1, self.sample_rate)

        # 设置时间戳
        if not hasattr(self, '_timestamp'):
            self._timestamp = 0
        frame.pts = self._timestamp
        self._timestamp += sample_count  # 增加样本数

        return frame


class AudioRecognizeTrack:
    def __init__(self, session_id: str, track: MediaStreamTrack, datachannels: WeakValueDictionary,
                 generate_audio_track: GeneratedAudioTrack):
        self.session_id = session_id
        self.track = track
        self.datachannels = datachannels
        self.generate_audio_track = generate_audio_track
        self.buffer = bytearray()
        self.capture_stream = False
        self.analyze_lock = asyncio.Lock()
        self.is_analyzing = False
        # 启动音频处理循环
        asyncio.create_task(self.process_audio())

    async def process_audio(self):
        """独立循环处理音频帧"""
        while True:
            try:
                frame = await self.track.recv()
                if self.capture_stream and isinstance(frame, AudioFrame):
                    # 将音频帧转换为numpy数组
                    array = frame.to_ndarray()
                    # 确保是16位整数
                    if array.dtype != np.int16:
                        # 如果不是，则转换（但通常应该是）
                        array = array.astype(np.int16)
                    raw_bytes = array.tobytes()
                    async with self.analyze_lock:
                        self.buffer.extend(raw_bytes)
                elif not self.capture_stream and len(self.buffer) > 0 and not self.is_analyzing:
                    async with self.analyze_lock:
                        if not self.is_analyzing:
                            self.is_analyzing = True
                            asyncio.create_task(self.analyze())
            except Exception as e:
                logging.error(f"Audio processing error: {str(e)}")
                break

    def start_track(self):
        self.capture_stream = True

    def stop_track(self):
        self.capture_stream = False

    async def _convert_audio(self, wav_path):
        """Convert buffer to WAV format"""
        try:
            # Convert to AudioSegment from raw PCM data
            audio = AudioSegment(
                data=bytes(self.buffer),
                sample_width=2,  # 16-bit samples
                frame_rate=48000,  # Sample rate
                channels=1  # Mono
            )
            audio.export(wav_path, format="wav")
            return True
        except Exception as e:
            logging.error(f"Audio conversion error: {str(e)}")
            return False

    async def analyze(self):
        """Process and analyze the captured audio"""
        try:
            current_time = time.time()
            wav_path = f'uploads/{current_time}.wav'

            # Convert buffer to WAV format
            if not await self._convert_audio(wav_path):
                return

            datachannel = self.datachannels[self.session_id]
            agent = session_manager.get_session(self.session_id)

            logging.info(f'channel status: {datachannel.readyState}')

            try:
                ratio_info = analyze_audio(wav_path)
            except Exception as e:
                logging.error(str(e))
                return
            content = ratio_info.get('content', '未识别到内容')
            summary = ratio_info.get('summary', None)
            logging.info(f'analyze audio content: {ratio_info}')
            datachannel.send(
                DataMessage(type='message', data=Message(type=MessageType.USER, content=content)).model_dump_json())
            if summary is not None:
                datachannel.send(
                    DataMessage(type='message', data=Message(type=MessageType.TIP, content=summary)).model_dump_json())
            logging.info(f'agent next status: {agent.next_status}')
            if agent.next_status == InterviewStatus.SELF_INTRO:
                message = agent.self_introduction(content, ratio_info)
                audio = generate_audio(message)
                datachannel.send(DataMessage(type='message',
                                             data=Message(type=MessageType.AI, content=message)).model_dump_json())
                agent.next_status = InterviewStatus.PROJECT_INTRO
            elif agent.next_status == InterviewStatus.PROJECT_INTRO:
                message = agent.project_introduction(content, ratio_info)
                audio = generate_audio(message)
                datachannel.send(DataMessage(type='message',
                                             data=Message(type=MessageType.AI, content=message)).model_dump_json())
                agent.next_status = InterviewStatus.SELF_EVALUATION
            elif agent.next_status == InterviewStatus.SELF_EVALUATION:
                message = agent.self_evaluation(content, ratio_info)
                audio = generate_audio(message)
                datachannel.send(DataMessage(type='message',
                                             data=Message(type=MessageType.AI, content=message)).model_dump_json())
                agent.next_status = InterviewStatus.ANSWER_QUESTION
            elif agent.next_status == InterviewStatus.ANSWER_QUESTION:
                node_res, ended = agent.answer_question(content, ratio_info)
                audio = generate_audio(node_res)
                datachannel.send(DataMessage(type='message',
                                             data=Message(type=MessageType.AI,
                                                          content=node_res)).model_dump_json())
                if ended:
                    agent.next_status = InterviewStatus.END
                    datachannel.send(DataMessage(type='control', data='end').model_dump_json())
                else:
                    agent.next_status = InterviewStatus.ANSWER_QUESTION
            else:
                logging.error(f'interview status is illegal, session id {self.session_id}')
                return
            self.generate_audio_track.add_audio(audio)
            datachannel.send(DataMessage(type='control', data='next').model_dump_json())
        except Exception as e:
            logging.error(f"Audio analysis error: {e}")
        finally:
            # Clear buffer and reset state
            self.buffer.clear()
            self.capture_stream = False
            self.is_analyzing = False
            try:
                # Remove temporary file
                if os.path.exists(wav_path):
                    os.remove(wav_path)
            except Exception as e:
                logging.error(f"Error removing file: {str(e)}")


class VideoTransformTrack(MediaStreamTrack):
    kind = 'video'

    def __init__(self, track: MediaStreamTrack):
        super().__init__()
        self.track = track
        self.pipeline = None
        self.frame_count = 0

    async def recv(self) -> Frame:
        if self.pipeline is None:
            self.pipeline = DetectMiniXceptionFER([0.1, 0.1])  # 首次使用时初始化
        frame = await self.track.recv()
        if isinstance(frame, VideoFrame):
            self.frame_count += 1

            array = frame.to_ndarray(format='bgr24')
            # 确保图像是3通道
            if array.ndim == 2 or array.shape[2] == 1:
                # 灰度转BGR
                array = cv2.cvtColor(array, cv2.COLOR_GRAY2BGR)
            try:
                output = self.pipeline(array)
                # 获取处理后的图像
                processed_image = output['image']

                # 调试：保存原始和处理后的图像
                # if self.frame_count % 30 == 0:  # 每30帧保存一次
                #     cv2.imwrite(f"frame_{self.frame_count}_original.jpg", array)
                #     cv2.imwrite(f"frame_{self.frame_count}_processed.jpg",
                #                 cv2.cvtColor(processed_image, cv2.COLOR_RGB2BGR))

                # 检查处理后的图像尺寸和类型
                if processed_image.shape[2] != 3:
                    logging.warning(f"Invalid channel count: {processed_image.shape}")
                    return frame

                # 创建新的VideoFrame
                new_frame = VideoFrame.from_ndarray(
                    processed_image,
                    format="bgr24"
                )

                # 保持原始帧的时间戳和属性
                new_frame.pts = frame.pts
                new_frame.time_base = frame.time_base

                return new_frame
            except Exception as e:
                logging.error(f'processing error: {str(e)}')
                return frame
        return frame
