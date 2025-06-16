from langchain_deepseek import ChatDeepSeek
from pydantic import SecretStr

from configs import interview_config

chat_model = ChatDeepSeek(
    model=interview_config.MODEL_NAME,
    temperature=1.3,
    max_retries=0,
    api_key=SecretStr(interview_config.API_KEY),
    base_url=interview_config.BASE_URL,
    streaming=interview_config.STREAMING,
)