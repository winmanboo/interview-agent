from pydantic_settings import SettingsConfigDict

from configs.database_config import DatabaseConfig
from configs.deployment_config import DeploymentConfig
from configs.graph_config import GraphConfig
from configs.logging_config import LoggingConfig
from configs.third_party_config import ThirdPartyConfig


class InterviewConfig(LoggingConfig, DeploymentConfig, GraphConfig, DatabaseConfig, ThirdPartyConfig):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )
