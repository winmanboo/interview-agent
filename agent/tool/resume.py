from typing import Annotated

from langchain_core.messages import ToolMessage
from langchain_core.tools import tool, InjectedToolCallId
from langgraph.types import Command

from agent.state import ResumeInfo


@tool
def analyze_resume(resume_info: ResumeInfo, tool_call_id: Annotated[str, InjectedToolCallId]):
    """解析求职者的简历"""
    return Command(update={
        'resume_info': resume_info,
        'messages': [
            ToolMessage(
                '已成功解析求职者简历',
                tool_call_id=tool_call_id
            )
        ]
    })
