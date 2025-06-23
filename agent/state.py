from typing import TypedDict, Annotated, List, Dict, Optional
from langchain_core.messages import AnyMessage
from langgraph.graph import add_messages
from pydantic import BaseModel, Field


class SentimentAnalysis(BaseModel):
    dominant_emotion: Optional[str] = Field(description="情绪标签")
    clarity_score: Optional[int] = Field(description="清晰度")
    fluency_score: Optional[int] = Field(description="流利度")
    expressiveness_score: Optional[int] = Field(description="表达力")
    voice_traits: Optional[List[str]] = Field(description="特征")


class Scoring(BaseModel):
    content_relevance: Optional[int] = Field(description="内容相关性")
    logical_structure: Optional[int] = Field(description="逻辑结构")
    professional_depth: Optional[int] = Field(description="专业深度")
    delivery_impact: Optional[int] = Field(description="交付影响")
    total_score: Optional[int] = Field(description="总评分")
    improvement_points: Optional[List[str]] = Field(description="缺陷点")


class Ratio(BaseModel):
    content: Optional[str] = Field(description="面试回答")
    summary: Optional[str] = Field(description="ai总结")
    sentiment_analysis: Optional[SentimentAnalysis] = Field(description="情感分析")
    scoring: Optional[Scoring] = Field(description="评分")


class QA(BaseModel):
    question: Optional[str] = Field(description="面试问题")
    answer: Optional[str] = Field(description="求职者回答")
    ratio: Optional[Ratio] = Field(description="评分")


class ResumeInfo(BaseModel):
    """求职者简历信息"""
    name: Optional[str]
    graduation_school: Optional[str]
    education_background: Optional[str]
    job_intention: Optional[str]
    awards: Optional[List[str]]
    work_experience: Optional[List[str]]


class State(TypedDict):
    messages: Annotated[List[AnyMessage], add_messages]
    current_question_index: int
    subjects: Dict[int, QA]
    resume: str
    resume_info: ResumeInfo
    self_introduction: str
    project_introduction: str
    self_evaluation: str
    self_introduction_ratio: Ratio
    project_introduction_ratio: Ratio
    self_evaluation_ratio: Ratio
