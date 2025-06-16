from flask_socketio import SocketIO

from interview_app import InterviewApp

socketio = SocketIO()

def init_app(app: InterviewApp):
    socketio.init_app(app, async_mode='gevent', cors_allowed_origins="*")