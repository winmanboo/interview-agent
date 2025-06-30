from datetime import datetime, timedelta

import jwt
from flask_restful import Resource

from configs import interview_config
from controllers.service_api import api


class GetSignApi(Resource):
    def get(self):
        sig_exp = interview_config.DUIX_SIG_EXP
        app_id = interview_config.DUIX_APP_ID
        app_key = interview_config.DUIX_APP_KEY
        expire_time = datetime.utcnow() + timedelta(seconds=sig_exp)

        payload = {
            "appId": app_id,
            "iat": datetime.utcnow(),  # 发行时间
            "exp": expire_time  # 过期时间
        }

        sign = jwt.encode(
            payload,
            app_key,
            algorithm="HS256"
        )
        return {
            'sign': sign,
            'conversation_id': interview_config.DUIX_SESSION_ID
        }

api.add_resource(GetSignApi, '/sign')

