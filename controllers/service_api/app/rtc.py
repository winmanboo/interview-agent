import logging

import requests
from flask_restful import reqparse, Resource

from agent import InterviewAgent
from configs import interview_config
from controllers.service_api import api
from libs import session_manager
from models.interview import Scene
from models.message import Message, MessageType

rtc_server = interview_config.RTC_SERVER

datachannel_url = rtc_server + '/api/datachannel'

class StartAgentApi(Resource):
    def _create_agent(self,session_id: str, scene: Scene) -> InterviewAgent:
        agent = InterviewAgent(session_id, scene.topic)
        session_manager.put_session(session_id, agent)
        return agent

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('scene_id', type=int, required=True)
        parser.add_argument('session_id', type=str, required=True)
        args = parser.parse_args()
        scene = Scene.query.get(args['scene_id'])
        session_id = args['session_id']
        if session_manager.get_session(session_id) is not None:
            raise Exception('Session already exists')
        agent = self._create_agent(session_id, scene)
        for chunk in agent.start():
            if len(chunk['messages']) > 0:
                content = chunk['messages'][-1].content
                logging.info(f'data channel send message: {content}')
                message = Message(type=MessageType.AI, content=content)
                requests.post(url=datachannel_url, json={'session_id': session_id, **message.model_dump()})

class AgentStatusApi(Resource):
    def get(self, session_id: str):
        agent = session_manager.get_session(session_id)
        if agent is None:
            raise Exception('Session does not exist')
        return agent.is_ended()


class AgentHandleApi(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('session_id', type=str, required=True)
        parser.add_argument('content', type=str, required=True)
        parser.add_argument('ratio_info', type=str, required=True)
        args = parser.parse_args()
        session_id = args['session_id']
        content = args['content']
        ratio_info = args['ratio_info']
        agent = session_manager.get_session(session_id)
        if agent is None:
            raise Exception('Session does not exist')
        logging.info(f'ratio info: {ratio_info}')
        message = agent.handler[agent.next_status](content, ratio_info)
        return {
            'content': message
        }

api.add_resource(StartAgentApi, '/agent/start')
api.add_resource(AgentStatusApi, '/agent/status/<string:session_id>')
api.add_resource(AgentHandleApi, '/agent/handle')

