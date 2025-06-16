import logging
import time

from configs import interview_config
from interview_app import InterviewApp


def create_app_with_configs() -> InterviewApp:
    interview_app = InterviewApp(__name__)
    interview_app.config.from_mapping(interview_config.model_dump())
    return interview_app


def initialize_extensions(app: InterviewApp):
    """初始化flask扩展"""
    from extensions import ext_logging, ext_blueprint, ext_websocket, ext_database

    extensions = [ext_logging, ext_blueprint, ext_websocket, ext_database]

    for ext in extensions:
        short_name = ext.__name__.split(".")[-1]
        is_enabled = ext.is_enabled() if hasattr(ext, "is_enabled") else True
        if not is_enabled:
            if interview_config.DEBUG:
                logging.info(f"Skipped {short_name}")
            continue

        start_time = time.perf_counter()
        ext.init_app(app)
        end_time = time.perf_counter()
        if interview_config.DEBUG:
            logging.info(f"Loaded {short_name} ({round((end_time - start_time) * 1000, 2)} ms)")


def create_app() -> InterviewApp:
    """创建flask应用"""
    app = create_app_with_configs()
    initialize_extensions(app)
    return app
