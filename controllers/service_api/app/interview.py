import asyncio
import logging
import threading
import uuid
from weakref import WeakValueDictionary
import gevent
from aiortc import RTCSessionDescription, RTCPeerConnection, RTCDataChannel
from aiortc.contrib.media import MediaRelay
from flask import request
from flask_socketio import emit
from agent import InterviewAgent
from agent.interview_agent import InterviewStatus
from extensions.ext_websocket import socketio
from libs import session_manager
from models.interview import Scene
from models.message import DataMessage
from rtc.track import AudioRecognizeTrack, VideoTransformTrack, GeneratedAudioTrack

namespace = "/interview"

# 设置全局 asyncio 事件循环
asyncio_loop = asyncio.new_event_loop()
asyncio.set_event_loop(asyncio_loop)


def start_asyncio_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()


# 启动 asyncio 事件循环线程
asyncio_thread = threading.Thread(
    target=start_asyncio_loop,
    args=(asyncio_loop,),
    daemon=True
)
asyncio_thread.start()


def run_async(coro):
    """在 asyncio 线程中运行异步协程"""
    return asyncio.run_coroutine_threadsafe(coro, asyncio_loop)


# 全局状态管理
pcs_lock = threading.Lock()
pcs = WeakValueDictionary()
audio_tracks = WeakValueDictionary()
video_tracks = WeakValueDictionary()
datachannels = WeakValueDictionary()
relay = MediaRelay()


@socketio.on("connect", namespace=namespace)
def connect():
    session_id = str(uuid.uuid4())
    logging.info(f'Client connected, session id: {session_id}')
    emit(
        'connected',
        {'session_id': session_id},
        broadcast=False
    )


@socketio.on('start', namespace=namespace)
def start_interview(data):
    session_id = data['session_id']
    scene_id = data['scene_id']
    scene = Scene.query.get(scene_id)
    agent = InterviewAgent(session_id, scene.topic)
    if agent is None:
        logging.error(f'Session id {session_id} not found')
        emit(
            'error',
            f'Session id {session_id} not found',
            broadcast=False
        )
        return
    session_manager.put_session(session_id, agent)
    agent.next_status = InterviewStatus.SELF_INTRO

    def run_interview():
        try:
            for idx, chunk in enumerate(agent.start()):
                if len(chunk['messages']) > 0:
                    content = chunk['messages'][-1].content
                    logging.info(f'Generated content: {content}')
                    # 在 asyncio 线程中发送消息
                    if session_id in datachannels:
                        logging.info(f'send message: {content}, idx: {idx}')
                        if idx == 1:
                            message = DataMessage(type='control', data='upload_resume').model_dump_json()
                        else:
                            message = DataMessage(type='message', data=content).model_dump_json()
                        run_async(send_message(session_id, message))
        except Exception as e:
            logging.error(f"Interview error: {str(e)}")

    # 使用 gevent 协程启动面试
    gevent.spawn(run_interview)


async def send_message(session_id, message):
    """在 asyncio 线程中安全发送消息"""
    if session_id in datachannels:
        datachannels[session_id].send(message)


@socketio.on('disconnecting', namespace=namespace)
def disconnecting(data):
    session_id = data['session_id']

    async def cleanup():
        logging.info(f'Cleaning up session: {session_id}')
        # 清理音视频轨道
        if session_id in audio_tracks:
            track = audio_tracks.pop(session_id)
            if hasattr(track, 'stop_track'):
                await track.stop_track()
        if session_id in video_tracks:
            track = video_tracks.pop(session_id)
            if hasattr(track, 'stop'):
                await track.stop()
        # 清理数据通道和PeerConnection
        if session_id in datachannels:
            datachannels.pop(session_id, None)
        if session_id in pcs:
            pc = pcs.pop(session_id)
            await pc.close()
        # 回收会话
        session_manager.recycle_session(session_id)
        logging.info(f'Session {session_id} resources cleaned up')

    # 在 asyncio 线程中执行清理
    run_async(cleanup())


@socketio.on("disconnect", namespace=namespace)
def disconnect():
    logging.info(f'Client disconnected: {request.sid}')


@socketio.on('stream_start', namespace=namespace)
def stream_start(data):
    session_id = data['session_id']
    if session_id in audio_tracks:
        track = audio_tracks[session_id]
        if hasattr(track, 'start_track'):
            logging.info('Starting audio track capture')
            track.start_track()
        return
    emit(
        'error',
        f'Session id {session_id} not found',
    )


@socketio.on('stream_stop', namespace=namespace)
def stream_stop(data):
    session_id = data['session_id']
    if session_id in audio_tracks:
        track = audio_tracks[session_id]
        if hasattr(track, 'stop_track'):
            logging.info('Stopping audio track capture')
            track.stop_track()
        return
    emit(
        'error',
        f'Session id {session_id} not found',
    )


@socketio.on('offer', namespace=namespace)
def handle_offer(data):
    session_id = data['session_id']
    sdp = data['sdp']
    offer_type = data['type']
    sid = request.sid  # 获取当前客户端的SocketIO会话ID

    # 创建异步处理函数
    async def process_offer():
        try:
            logging.info(f'Processing WebRTC offer for session: {session_id}')

            offer = RTCSessionDescription(sdp=sdp, type=offer_type)
            pc = RTCPeerConnection()

            # 保存PeerConnection
            with pcs_lock:
                pcs[session_id] = pc

            # 添加生成音频轨道并设置方向
            generate_audio_track = GeneratedAudioTrack()
            audio_sender = pc.addTrack(generate_audio_track)

            for transceiver in pc.getTransceivers():
                if transceiver.sender == audio_sender and transceiver.sender.track == generate_audio_track:
                    transceiver.direction = 'sendonly'
                    logging.info('generate audio track set direction sendonly')
                    break

            # 定义事件处理函数
            def log_info(msg):
                logging.info(f'[{session_id}] {msg}')

            @pc.on('datachannel')
            def on_datachannel(channel: RTCDataChannel):
                log_info(f'Data channel created: {channel.label}')

                datachannels[session_id] = channel

                @channel.on('message')
                def on_message(message):
                    log_info(f'Received data channel message: {message}')

                    # 处理ping/pong
                    if isinstance(message, str) and message.startswith('ping'):
                        channel.send('pong' + message[4:])

            @pc.on('connectionstatechange')
            async def on_connection_state_change():
                state = pc.connectionState
                log_info(f'Connection state changed: {state}')

                if state == 'failed':
                    await pc.close()
                    with pcs_lock:
                        if session_id in pcs:
                            pcs.pop(session_id, None)

            @pc.on('track')
            def on_track(track):
                log_info(f'Track received: {track.kind}')

                if track.kind == 'audio':
                    audio_track = AudioRecognizeTrack(
                        session_id,
                        relay.subscribe(track),
                        datachannels,
                        generate_audio_track
                    )
                    audio_tracks[session_id] = audio_track
                    # 设置正确的transceiver方向
                    for t in pc.getTransceivers():
                        if t.receiver.track == track:
                            t.direction = "recvonly"
                            break

                elif track.kind == 'video':
                    video_track = VideoTransformTrack(relay.subscribe(track))
                    video_tracks[session_id] = video_track
                    pc.addTrack(video_track)
                    
            # 延迟设置音频发送方向（确保轨道已初始化）
            @pc.on('connectionstatechange')
            async def on_connection_state_change():
                state = pc.connectionState
                log_info(f'Connection state changed: {state}')
                
                if state == 'failed':
                    await pc.close()
                    with pcs_lock:
                        if session_id in pcs:
                            pcs.pop(session_id, None)

            # 处理offer
            await pc.setRemoteDescription(offer)

            # 创建并设置本地描述 - 先设置方向再创建answer
            await pc.setLocalDescription(await pc.createAnswer())
            logging.info(f'Answer created: {pc.localDescription}')

            # 等待ICE收集完成
            while pc.iceGatheringState != 'complete':
                await asyncio.sleep(0.1)

            # 发送answer给客户端
            if pc.localDescription:
                emit('answer', {
                    'session_id': session_id,
                    'sdp': pc.localDescription.sdp,
                    'type': pc.localDescription.type
                }, room=sid)
                logging.info(f'Sent WebRTC answer for session: {session_id}')
            else:
                logging.error("Failed to get localDescription for answer")
                emit('error', 'Failed to create WebRTC answer', room=sid)

        except Exception as e:
            logging.exception(f'WebRTC offer processing failed: {str(e)}')
            # 发送错误消息到指定房间
            emit('error', 'WebRTC connection failed', room=sid)

    # 在 asyncio 线程中处理 offer
    run_async(process_offer())


# 应用关闭时清理资源
@socketio.on('shutdown', namespace=namespace)
def on_shutdown():
    async def close_all_pcs():
        logging.info("Shutting down WebRTC connections...")
        with pcs_lock:
            for pc in list(pcs.values()):
                await pc.close()
            pcs.clear()
        logging.info("All WebRTC connections closed")

    run_async(close_all_pcs())
    asyncio_loop.call_soon_threadsafe(asyncio_loop.stop)
