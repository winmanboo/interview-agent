from __future__ import annotations

from typing import Optional

from langchain_core.runnables import RunnableConfig, ensure_config
from pydantic import BaseModel, Field


class Configuration(BaseModel):
    max_subject_number: int = Field(default=5, description='Maximum subject number')
    job_position: str = Field(description='求职岗位')

    @classmethod
    def from_runnable_config(
            cls: Configuration, config: Optional[RunnableConfig] = None
    ) -> Configuration:
        """Create an IndexConfiguration instance from a RunnableConfig object.

        Args:
            cls (Type[T]): The class itself.
            config (Optional[RunnableConfig]): The configuration object to use.

        Returns:
            T: An instance of IndexConfiguration with the specified configuration.
        """
        config = ensure_config(config)
        configurable = config.get("configurable") or {}
        _fields = set(cls.model_fields.keys())
        return cls(**{k: v for k, v in configurable.items() if k in _fields})
