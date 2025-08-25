import os

from dotenv import load_dotenv
from langchain_deepseek import ChatDeepSeek
from langchain_openai import ChatOpenAI
from openai import OpenAI
from pydantic import SecretStr

from configs import interview_config

load_dotenv()

report_model = ChatDeepSeek(
    model=interview_config.MODEL_NAME,
    temperature=1.3,
    max_retries=0,
    api_key=SecretStr(interview_config.API_KEY),
    base_url=interview_config.BASE_URL,
    streaming=interview_config.STREAMING
)

chat_model = ChatOpenAI(
    model='qwen-plus',
    temperature=1.3,
    max_retries=0,
    api_key=SecretStr(os.getenv('DASHSCOPE_API_KEY')),
    base_url='https://dashscope.aliyuncs.com/compatible-mode/v1',
    streaming=True
)

client = OpenAI(
    api_key=interview_config.API_KEY,
    base_url=interview_config.BASE_URL,
)
