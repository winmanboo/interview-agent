import logging
import os
import time

from flask_restful import Resource, reqparse, marshal_with, fields
from werkzeug.datastructures import FileStorage
from werkzeug.exceptions import BadRequest

from controllers.service_api import api
from libs import session_manager
from models.interview import Category, Scene
from models.message import MessageType
from langchain_community.document_loaders import PyPDFLoader


class InterviewUploadResumeApi(Resource):
    ALLOWED_EXTENSIONS = {'.pdf', '.txt'}
    TEMP_DIR = 'uploads/'

    def post(self, session_id):
        parser = reqparse.RequestParser()
        # location指定files确保reqparse从指定的files中寻找file，有时候reqparse可能会在错误的位置寻找
        parser.add_argument('file', type=FileStorage, location="files", required=True)
        args = parser.parse_args()
        file = args['file']
        if not file:
            raise BadRequest('No file provided')

        filename = file.filename
        _, file_extension = os.path.splitext(filename)
        file_extension = file_extension.lower()  # 转换为小写方便比较

        # 检查文件后缀
        if file_extension not in self.ALLOWED_EXTENSIONS:
            raise BadRequest(f'Invalid file type. Allowed types: {", ".join(self.ALLOWED_EXTENSIONS)}')

        logging.info(f"Uploading {args['file'].filename}")
        agent = session_manager.get_session(session_id)
        if not agent:
            raise BadRequest('No session found')
        if file_extension == '.txt':
            text = file.read().decode('utf-8')
            message = agent.commit_resume(text)
        elif file_extension == '.pdf':
            temp_file_path = os.path.join(self.TEMP_DIR, f'{filename}_{time.time()}')
            try:
                file.save(temp_file_path)
                loader = PyPDFLoader(temp_file_path)
                docs = loader.load()
                text = "\n".join([doc.page_content for doc in docs])
                message = agent.commit_resume(text)
            finally:
                os.unlink(temp_file_path)
        else:
            raise BadRequest('Unsupported file type')
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
