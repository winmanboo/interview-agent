from pydantic import Field
from pydantic_settings import BaseSettings


class RtcConfig(BaseSettings):

    RTC_SERVER: str = Field(default='http://localhost:8080', description='RTC server url')