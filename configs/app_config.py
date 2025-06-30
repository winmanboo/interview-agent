from pydantic_settings import SettingsConfigDict

from configs.database_config import DatabaseConfig
from configs.deployment_config import DeploymentConfig
from configs.duix_config import DuixConfig
from configs.graph_config import GraphConfig
from configs.logging_config import LoggingConfig
from configs.rtc_config import RtcConfig


class InterviewConfig(LoggingConfig, DeploymentConfig, GraphConfig, DatabaseConfig, RtcConfig, DuixConfig):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )
