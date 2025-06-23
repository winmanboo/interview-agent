import asyncio
import logging
import weakref

from webrtc.rtc_manager import dcs

message_queues = weakref.WeakValueDictionary()


class MessageDispatcher:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    async def start(self):
        """显式启动分发器"""
        if not self._initialized:
            self._task = asyncio.create_task(self._run())
            self._initialized = True

    async def stop(self):
        """停止分发器"""
        if self._initialized:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
            self._initialized = False

    async def _run(self):
        """主线程消息分发器"""
        while True:
            for session_id, queue in list(message_queues.items()):
                while not queue.empty():
                    msg = queue.get_nowait()
                    if session_id in dcs and dcs[session_id].readyState == "open":
                        try:
                            await dcs[session_id].send(msg.model_dump_json())
                        except Exception as e:
                            logging.error(f"Send failed: {e}")
            await asyncio.sleep(0.01)  # 避免CPU空转

dispatcher = MessageDispatcher()