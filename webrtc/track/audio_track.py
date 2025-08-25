import asyncio
import logging
import os
import queue
import time
from concurrent.futures import ThreadPoolExecutor

import aiohttp
import numpy as np
from av import AudioFrame
from av.frame import Frame
from pydub import AudioSegment

from aiortc import AudioStreamTrack
from models.message import Message, MessageType
from webrtc.event_bus import message_queues
from webrtc.rtc_manager import api_server_url
from webrtc.third_party.audio_helper import analyze_audio

# 全局线程池和消息队列
executor = ThreadPoolExecutor(max_workers=4)

class LocalAudioTrack(AudioStreamTrack):

    def __init__(self, session_id: str) -> None:
        super().__init__()
        self.recording = False  # 默认不录音，调用cut_off时开始录音
        self.buffer = bytearray()
        self.session_id = session_id
        self.message_queue = queue.Queue()
        self.sample_rate = 8000  # 默认采样率，会在接收第一帧时更新
        self.channels = 1  # 默认单声道
        self.input_track = None  # 输入音频轨道
        self._processing_task = None  # 音频处理任务
        message_queues[session_id] = self.message_queue
        
    def set_input_track(self, track):
        """设置输入音频轨道并开始处理"""
        self.input_track = track
        logging.info(f"Input audio track set for session {self.session_id}")
        # 启动音频处理任务
        if self._processing_task is None:
            self._processing_task = asyncio.create_task(self._process_input_audio())
            
    async def _process_input_audio(self):
        """处理输入音频轨道的数据"""
        if not self.input_track:
            return
            
        logging.info(f"Starting audio processing for session {self.session_id}")
        try:
            while True:
                frame = await self.input_track.recv()
                if isinstance(frame, AudioFrame):
                    await self._process_audio_frame(frame)
        except Exception as e:
            logging.error(f"Audio processing error: {e}")
            
    async def _process_audio_frame(self, frame: AudioFrame):
        """处理单个音频帧"""
        if not self.recording:
            return
            
        try:
            # 更新采样率和声道数
            self.sample_rate = frame.sample_rate
            self.channels = len(frame.layout.channels)
            
            # 将音频帧转换为numpy数组
            array = frame.to_ndarray()
            logging.debug(f"Audio frame - sample_rate: {self.sample_rate}, channels: {self.channels}")
            logging.debug(f"Audio frame shape: {array.shape}, dtype: {array.dtype}")
            logging.debug(f"Audio data stats - min: {np.min(array)}, max: {np.max(array)}, mean: {np.mean(array):.6f}")
            
            # 检查是否有实际音频数据
            if np.all(array == 0):
                logging.warning("Received audio frame with all zero data")
            else:
                logging.info(f"Received audio frame with actual data - non-zero samples: {np.count_nonzero(array)}")
            
            # 转换为16位整数并添加到缓冲区
            audio_data = self._convert_to_16bit(array)
            self.buffer.extend(audio_data)
            logging.debug(f"Buffer size after adding frame: {len(self.buffer)} bytes")
            
        except Exception as e:
            logging.error(f"Error processing audio frame: {e}")
            
    def _convert_to_16bit(self, array):
        """将音频数组转换为16位整数字节数据"""
        # 确保数据在[-1, 1]范围内
        array = np.clip(array, -1.0, 1.0)
        # 转换为16位整数
        int16_array = (array * 32767).astype(np.int16)
        return int16_array.tobytes()

    async def recv(self) -> Frame:
        # 这个方法现在主要用于输出轨道功能
        # 实际的音频处理现在在_process_input_audio中进行
        frame: Frame = await super().recv()
        return frame

    def cut_off(self):
        logging.info('start recording audio stream')
        self.recording = True

    async def _convert_audio(self, wav_path):
        try:
            logging.info(f"Converting audio: {len(self.buffer)} bytes, sample_rate: {self.sample_rate}, channels: {self.channels}")
            audio = AudioSegment(
                data=bytes(self.buffer),
                sample_width=2,  # 16-bit samples
                frame_rate=self.sample_rate,  # 使用实际采样率
                channels=self.channels  # 使用实际声道数
            )
            audio.export(wav_path, format="wav")
            logging.info(f"Audio saved to {wav_path}, duration: {len(audio)} ms")
            return True
        except Exception as e:
            logging.error(f"Audio conversion error: {str(e)}")
            return False

    async def analyze(self):
        logging.info('start analyzing audio stream')
        current_time = time.time()
        wav_path = f'webrtc/uploads/{current_time}.wav'
        
        # 确保uploads目录存在
        os.makedirs('webrtc/uploads', exist_ok=True)
        
        try:
            logging.info(f"Buffer size before conversion: {len(self.buffer)} bytes")
            if len(self.buffer) == 0:
                logging.warning("No audio data in buffer")
                return
                
            if not await self._convert_audio(wav_path):
                logging.error(f'Audio conversion error: {wav_path}')
                return
            loop = asyncio.get_event_loop()
            ratio_info = await loop.run_in_executor(
                executor,
                lambda: analyze_audio(wav_path)
            )
            self.recording = False
            async with aiohttp.ClientSession() as session:
                content = ratio_info['content']
                summary = ratio_info['summary']
                self._put_message(Message(type=MessageType.USER, content=content))
                if summary is not None:
                    self._put_message(Message(type=MessageType.TIP, content=summary))
                logging.info(f'ratio info: {ratio_info}')
                async with session.post(f'{api_server_url}/v1/agent/handle', json={
                    'session_id': self.session_id,
                    'content': content,
                    'ratio_info': ratio_info
                }) as response:
                    data = await response.json()
                    self._put_message(Message(type=MessageType.AI, content=data['content']))
                async with session.get(f'{api_server_url}/v1/agent/status/{self.session_id}') as response:
                    self._put_message(
                        Message(type=MessageType.CUSTOM,
                                content='end' if str(await response.json()).lower() == 'true' else 'next')
                    )
        except Exception as e:
            logging.error(f'audio analyze error: {str(e)}')
        finally:
            # 停止录音并清空buffer
            self.recording = False
            # 创建新的buffer而不是清空现有的，避免BufferError
            self.buffer = bytearray()
            logging.info("Audio buffer cleared, recording stopped")
            if os.path.exists(wav_path):
                os.remove(wav_path)

    def _put_message(self, message: Message):
        """将消息放入队列"""
        self.message_queue.put(message)