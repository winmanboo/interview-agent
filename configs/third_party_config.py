from pydantic import Field
from pydantic_settings import BaseSettings


class ThirdPartyConfig(BaseSettings):
    DASHSCOPE_API_KEY: str = Field(default=None, description='dash scope api key')