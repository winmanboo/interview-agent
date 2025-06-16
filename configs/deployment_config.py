from pydantic import Field
from pydantic_settings import BaseSettings


class DeploymentConfig(BaseSettings):
    DEBUG: bool = Field(
        default=True,
        description="Enable debug mode",
    )