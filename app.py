import gevent.monkey

gevent.monkey.patch_all()

from app_factory import create_app
from extensions.ext_websocket import socketio

app = create_app()

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001, debug=True)
