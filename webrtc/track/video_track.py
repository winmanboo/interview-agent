import logging

import cv2
from av import VideoFrame
from av.frame import Frame

from aiortc import MediaStreamTrack
from paz.pipelines import DetectMiniXceptionFER


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
