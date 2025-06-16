from flask import Blueprint

from libs.external_api import ExternalApi

bp = Blueprint('service_api', __name__, url_prefix='/v1')

api = ExternalApi(bp)

from .app import app, interview

# 上传简历文件或者在线生成？
# 开始面试（开始面试前需要上传简历或者在线生成后提交）
# 结束面试
# 回答问题（约定回答时长1分钟）
# 结束回答问题
