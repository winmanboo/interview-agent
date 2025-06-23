import logging

from flask_restful import Resource, reqparse, marshal_with, fields
from werkzeug.datastructures import FileStorage
from werkzeug.exceptions import BadRequest

from controllers.service_api import api
from libs import session_manager
from models.interview import Category, Scene
from models.message import MessageType


class InterviewUploadResumeApi(Resource):
    def post(self, session_id):
        parser = reqparse.RequestParser()
        # location指定files确保reqparse从指定的files中寻找file，有时候reqparse可能会在错误的位置寻找
        parser.add_argument('file', type=FileStorage, location="files", required=True)
        args = parser.parse_args()
        file = args['file']
        if not file:
            raise BadRequest('No file provided')
        logging.info(f"Uploading {args['file'].filename}")
        agent = session_manager.get_session(session_id)
        if not agent:
            raise BadRequest('No session found')
        # FIXME 其他loader需要临时文件，然后用Loader加载
        text = file.read().decode('utf-8')
        message = agent.commit_resume(text)
        return {
            'type': MessageType.AI,
            "content": message,
        }


class CategoryApi(Resource):
    category_fields = {
        'id': fields.Integer,
        'name': fields.String
    }

    @marshal_with({
        'categories': fields.List(fields.Nested(category_fields)),
    })
    def get(self):
        return {'categories': Category.query.all()}


class ScenesApi(Resource):
    scene_fields = {
        'id': fields.Integer,
        'topic': fields.String,
        'estimated_time': fields.String,
        'difficulty': fields.Integer,
        'introduction': fields.String,
        'tags': fields.String,
    }

    @marshal_with({
        'scenes': fields.List(fields.Nested(scene_fields)),
    })
    def get(self, category_id):
        return {'scenes': Scene.query.filter_by(category_id=category_id).all()}


api.add_resource(InterviewUploadResumeApi, '/interview/upload/<string:session_id>')
api.add_resource(ScenesApi, '/scenes/<string:category_id>')
api.add_resource(CategoryApi, '/categories')
