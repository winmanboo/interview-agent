from aiohttp import web
from aiohttp.web import middleware
from config import config


@middleware
async def cors_middleware(request, handler):
    # 处理 OPTIONS 预检请求
    if request.method == "OPTIONS":
        response = web.Response()
    else:
        response = await handler(request)

    # 设置 CORS 头
    origin = request.headers.get('Origin')
    if origin in config.CORS_ORIGINS or config.CORS_ORIGINS == ['*']:
        response.headers['Access-Control-Allow-Origin'] = origin or '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Access-Control-Max-Age'] = '86400'

    return response


@middleware
async def error_middleware(request, handler):
    try:
        response = await handler(request)
        if response.status == 404:
            return web.json_response({'error': 'Not Found'}, status=404)
        return response
    except web.HTTPException as ex:
        return web.json_response({'error': ex.reason}, status=ex.status)
    except Exception as e:
        return web.json_response({'error': str(e)}, status=500)


def setup_middlewares(app):
    app.middlewares.append(error_middleware)
    app.middlewares.append(cors_middleware)