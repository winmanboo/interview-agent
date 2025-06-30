from pydantic import Field
from pydantic_settings import BaseSettings


class DuixConfig(BaseSettings):

    DUIX_APP_ID: str = Field(description="Duix app id")

    DUIX_APP_KEY: str = Field(description="Duix app key")

    DUIX_SIG_EXP: int = Field(default=3600, description="Duix app sig exp")

    DUIX_SESSION_ID: str= Field(description="Duix session id")