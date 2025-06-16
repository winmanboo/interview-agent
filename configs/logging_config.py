from pydantic import Field
from typing import Optional
from pydantic_settings import BaseSettings


class LoggingConfig(BaseSettings):
    LOG_LEVEL: str = Field(
        default="DEBUG",
        description="Logging level, default to INFO. Set to ERROR for production environments."
    )

    LOG_FORMAT: str = Field(
        description="Format string for log messages",
        default="%(asctime)s.%(msecs)03d %(levelname)s [%(threadName)s] [%(filename)s:%(lineno)d] - %(message)s",
    )

    LOG_DATEFORMAT: Optional[str] = Field(
        description="Date format string for log timestamps",
        default=None,
    )

    LOG_TZ: Optional[str] = Field(
        description="Timezone for log timestamps (e.g., 'America/New_York')",
        default="UTC",
    )