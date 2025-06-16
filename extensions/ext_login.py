from flask_login import LoginManager

from interview_app import InterviewApp

login_manager = LoginManager()

def init_app(app: InterviewApp):
    login_manager.init_app(app)