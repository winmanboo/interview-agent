import json
import logging
import uuid

from aiohttp import web

from aiortc import RTCSessionDescription, RTCPeerConnection, RTCDataChannel
from aiortc.contrib.media import MediaRelay
from models.message import Message
from webrtc.rtc_manager import dcs, pcs
from webrtc.track.audio_track import LocalAudioTrack
from webrtc.track.video_track import VideoTransformTrack

logger = logging.getLogger("pc")
relay = MediaRelay()

async def health_check(request):
    return web.json_response({'status': 'ok'})

async def datachannel(request):
    params = await request.json()
    type = params['type']
    content = params['content']
    session_id = params['session_id']
    channel = dcs.get(session_id, None)
    if channel is None:
        logging.error(f'channel not found: {session_id}')
        return web.json_response(status=404)
    message = Message(type=type, content=content).model_dump_json()
    logging.info(f'data channel send message: {content}')
    channel.send(message)
    return web.json_response(status=200)

async def offer(request):
    params = await request.json()
    offer = RTCSessionDescription(sdp=params["sdp"], type=params["type"])

    session_id = str(uuid.uuid4())

    pc = RTCPeerConnection()
    pc_id = "PeerConnection(%s)" % session_id
    pcs[session_id] = pc

    def log_info(msg, *args):
        logger.info(pc_id + " " + msg, *args)

    log_info("Created for %s", request.remote)

    audio_track = LocalAudioTrack(session_id)


    @pc.on('datachannel')
    async def on_datachannel(channel: RTCDataChannel):
        log_info('data channel created')

        dcs[session_id] = channel

        @channel.on('message')
        async def on_message(message):
            log_info(f'received data channel message: {message}')
            assert isinstance(message, str)
            if message == 'ping':
                channel.send('pong')
            elif message == 'start':
                # fixme 前端没有发送start事件
                audio_track.cut_off()
            elif message == 'stop':
                await audio_track.analyze()

    @pc.on("connectionstatechange")
    async def on_connectionstatechange():
        logging.info("Connection state is %s", pc.connectionState)
        if pc.connectionState == "failed":
            await pc.close()
            pcs.pop(session_id, None)
            del pcs[session_id]

    @pc.on("icecandidate")
    def on_icecandidate(candidate):
        logging.info(f'ice candidate received: {candidate}')

    @pc.on("track")
    def on_track(track):
        logging.info("Track %s received", track.kind)

        if track.kind == "video":
            logging.info('add video track')
            local_video = VideoTransformTrack(relay.subscribe(track))
            pc.addTrack(local_video)

        elif track.kind == 'audio':
            logging.info('add audio track')
            pc.addTrack(audio_track)

    # handle offer
    await pc.setRemoteDescription(offer)

    # send answer
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    return web.Response(
        content_type="application/json",
        text=json.dumps(
            {"sdp": pc.localDescription.sdp, "type": pc.localDescription.type, 'session_id': session_id}
        ),
    )

def setup_routes(app: web.Application):
    app.router.add_get('/health', health_check)

    app.router.add_post('/api/offer', offer)

    app.router.add_post('/api/datachannel', datachannel)

