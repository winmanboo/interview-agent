from pydantic import Field
from pydantic_settings import BaseSettings


class DatabaseConfig(BaseSettings):
    SQLALCHEMY_DATABASE_URI: str = Field(description="数据库地址", default=None)

    SQLALCHEMY_ECHO: bool = Field(default=True, description="查询显示原始SQL语句")

    SQLALCHEMY_COMMIT_ON_TEARDOWN: bool = Field(default=False, description="是否自动提交")
