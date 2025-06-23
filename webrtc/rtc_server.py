import asyncio
import logging

from aiohttp import web

from config import config
from middlewares import setup_middlewares
from routes import setup_routes
from webrtc.event_bus import dispatcher


def create_app():
    app = web.Application()

    # 设置中间件
    setup_middlewares(app)

    # 设置路由
    setup_routes(app)

    return app


async def run_app():
    await dispatcher.start()

    app = create_app()

    runner = web.AppRunner(app)
    await runner.setup()

    site = web.TCPSite(
        runner,
        host=config.HOST,
        port=config.PORT,
        ssl_context=config.ssl_context
    )

    await site.start()
    print(f"Server started at http{'s' if config.ssl_context else ''}://{config.HOST}:{config.PORT}")

    # 保持服务器运行
    while True:
        await asyncio.sleep(3600)  # sleep for 1 hour

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    try:
        asyncio.run(run_app())
    except KeyboardInterrupt:
        logging.info("Server stopped")