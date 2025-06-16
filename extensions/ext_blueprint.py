from interview_app import InterviewApp
from flask_cors import CORS
from controllers.service_api import bp as service_api_bp

def init_app(app: InterviewApp):
    CORS(
        service_api_bp,
        origins="*",
        # allow_headers=["Content-Type", "Authorization",],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    )

    app.register_blueprint(service_api_bp)