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
        self.cut_off_flag = False
        self.buffer = bytearray()
        self.session_id = session_id
        self.message_queue = queue.Queue()
        message_queues[session_id] = self.message_queue

    async def recv(self) -> Frame:
        frame: Frame = await super().recv()
        if self.cut_off_flag and isinstance(frame, AudioFrame):
            # 将音频帧转换为numpy数组
            array = frame.to_ndarray()
            # 确保是16位整数
            if array.dtype != np.int16:
                # 如果不是，则转换（但通常应该是）
                array = array.astype(np.int16)
            raw_bytes = array.tobytes()
            self.buffer.extend(raw_bytes)
        return frame

    def cut_off(self):
        logging.info('cut off audio stream')
        self.cut_off_flag = True

    async def _convert_audio(self, wav_path):
        try:
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
        logging.info('end cut off audio stream')
        self.cut_off_flag = False
        current_time = time.time()
        wav_path = f'uploads/{current_time}.wav'
        try:
            if not await self._convert_audio(wav_path):
                logging.error(f'Audio conversion error: {wav_path}')
                return
            loop = asyncio.get_event_loop()
            ratio_info = await loop.run_in_executor(
                executor,
                lambda: analyze_audio(wav_path)
            )
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
            self.buffer.clear()
            if os.path.exists(wav_path):
                os.remove(wav_path)

    def _put_message(self, message: Message):
        """将消息放入队列"""
        self.message_queue.put(message)