from pydantic import Field
from pydantic_settings import BaseSettings


class GraphConfig(BaseSettings):
    MODEL_NAME: str = Field(description="model name, like deepseek-chat.", default=None)

    API_KEY: str = Field(description="api key for llm.", default=None)

    BASE_URL: str = Field(description="base url for llm.", default=None)

    STREAMING: bool = Field(default=True, description="streaming mode.")
