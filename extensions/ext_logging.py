import logging
import sys

from configs import interview_config
from interview_app import InterviewApp


def init_app(app: InterviewApp):
    log_handlers: list[logging.Handler] = []

    sh = logging.StreamHandler(sys.stdout)
    log_handlers.append(sh)

    logging.basicConfig(
        level=interview_config.LOG_LEVEL,
        format=interview_config.LOG_FORMAT,
        datefmt=interview_config.LOG_DATEFORMAT,
        handlers=log_handlers,
        force=True,
    )

    log_tz = interview_config.LOG_TZ
    if log_tz:
        from datetime import datetime

        import pytz

        timezone = pytz.timezone(log_tz)

        def time_converter(seconds):
            return datetime.fromtimestamp(seconds, tz=timezone).timetuple()

        for handler in logging.root.handlers:
            if handler.formatter:
                handler.formatter.converter = time_converter
