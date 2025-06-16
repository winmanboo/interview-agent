import logging

from flask_restful import Resource, reqparse

from controllers.service_api import api

class LoginApi(Resource):
    def post(self):
        pass

api.add_resource(LoginApi, '/login')