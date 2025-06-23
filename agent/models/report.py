# agent/models/report.py

"""
面试评测报告数据结构

该数据结构用于存储模拟面试的完整评测结果，
包含了总体评价、多维度能力分析、详细分析和个性化建议等信息。
此结构旨在为前端页面提供渲染所需的所有数据。
"""

from typing import List, Dict, Literal

from pydantic import BaseModel, Field


# ------------------------- 基础模型 -------------------------
class Tag(BaseModel):
    """问题标签模型"""
    category: str = Field(..., description="所属分类（如'专业知识'）")
    rating: str = Field(..., description="评级文字（如'优秀'）")
    level: Literal["excellent", "good", "fair", "poor"] = Field(
        ..., description="评级等级（用于前端样式）"
    )




class KeyQuestion(BaseModel):
    """关键问题分析模型"""
    question: str = Field(..., description="问题内容")
    analysis: str = Field(..., description="回答分析")
    tag: Tag = Field(..., description="问题标签")


class SkillScore(BaseModel):
    """技能评分模型"""
    skill: str = Field(..., description="技能名称")
    score: int = Field(..., description="评分（0-100）", ge=0, le=100)


class EmotionScore(BaseModel):
    """情感评分模型"""
    emotion: str = Field(..., description="情感类型（如'自信'）")
    score: int = Field(..., description="评分（0-100）", ge=0, le=100)


class ExpressionAnalysis(BaseModel):
    """表情分析模型"""
    expression: str = Field(..., description="表情类型（如'自信'）")
    emoji: str = Field(..., description="对应表情符号")
    percentage: int = Field(..., description="出现百分比（0-100）", ge=0, le=100)


class BodyLanguageAspect(BaseModel):
    """肢体语言分析模型"""
    aspect: str = Field(..., description="分析方面（如'坐姿端正'）")
    score: int = Field(..., description="评分（0-100）", ge=0, le=100)


class LearningResource(BaseModel):
    """学习资源模型"""
    title: str = Field(..., description="资源标题")
    url: str = Field(default="#", description="资源链接（示例用'#'）", )


# ------------------------- 主模型 -------------------------
class ReportMeta(BaseModel):
    """报告元数据模型"""
    title: str = Field(..., description="报告标题")
    completion_time: str = Field(
        ..., description="完成时间（格式：'YYYY年MM月DD日 HH:MM'）"
    )


class OverallEvaluation(BaseModel):
    """总体评价模型"""
    score: int = Field(..., description="总体评分（0-100）", ge=0, le=100)
    rating: str = Field(..., description="文字评级（如'优秀'）")
    percentile: int = Field(
        ..., description="超越同专业求职者的百分比（0-100）", ge=0, le=100
    )


class AbilityRadar(BaseModel):
    """能力雷达图模型"""
    labels: List[str] = Field(..., description="能力标签列表")
    scores: List[int] = Field(
        ..., description="对应能力评分（0-100）", min_length=1, max_length=6
    )


class OverviewSummary(BaseModel):
    """总览摘要模型"""
    text: str = Field(..., description="总结文本")
    strengths: List[str] = Field(..., description="优点列表")
    improvements: List[str] = Field(..., description="改进建议列表")

class Overview(BaseModel):
    overview_summary: OverviewSummary = Field(...,)
    key_questions: List[KeyQuestion] = Field(...,)

class STARStructure(BaseModel):
    """STAR结构分析模型"""
    scores: Dict[str, int] = Field(
        ...,
        description="各维度评分（S/T/A/R）",
        examples=[{"situation": 90, "task": 85, "action": 75, "result": 70}],
    )
    summary: str = Field(..., description="分析总结")


class ContentAnalysis(BaseModel):
    """内容分析模型"""
    knowledge_assessment: List[SkillScore] = Field(
        ..., description="专业知识评估"
    )
    keywords: List[str] = Field(..., description="回答关键词")
    star_structure: STARStructure = Field(..., description="STAR结构分析")


class SpeechRateAnalysis(BaseModel):
    """语速分析模型"""
    value: int = Field(
        ..., description="语速评分（0-100，50为适中）", ge=0, le=100
    )
    summary: str = Field(..., description="分析总结")


class ToneEmotionAnalysis(BaseModel):
    """语调情感分析模型"""
    tone_emotion: List[EmotionScore] = Field(..., description="情感评分列表")


class ClarityAnalysis(BaseModel):
    """语言清晰度模型"""
    score: int = Field(..., description="清晰度评分（0-100）", ge=0, le=100)
    summary: str = Field(..., description="分析总结")


class EyeContactAnalysis(BaseModel):
    """眼神接触分析模型"""
    score: int = Field(..., description="评分（0-100）", ge=0, le=100)
    summary: str = Field(..., description="分析总结")


class VisualAnalysis(BaseModel):
    """视觉分析模型"""
    facial_expression: List[ExpressionAnalysis] = Field(
        ..., description="面部表情分析"
    )
    eye_contact: EyeContactAnalysis = Field(..., description="眼神接触分析")
    body_language: List[BodyLanguageAspect] = Field(
        ..., description="肢体语言分析"
    )


class PersonalizedSuggestions(BaseModel):
    """个性化建议模型"""
    immediate_improvements: List[str] = Field(
        ..., description="立即改进项"
    )
    long_term_enhancements: List[str] = Field(
        ..., description="长期提升项"
    )


class LearningResources(BaseModel):
    """学习资源模型"""
    technical_improvement: List[LearningResource] = Field(
        ..., description="技术提升资源"
    )
    interview_skills: List[LearningResource] = Field(
        ..., description="面试技巧资源"
    )
    full_path_url: str = Field(
        default="#", description="完整学习路径链接",
    )


class SpeechAnalysis(BaseModel):
    speech_rate_analysis: SpeechRateAnalysis = Field(...)
    tone_emotion_analysis: ToneEmotionAnalysis = Field(...)
    clarity_analysis: ClarityAnalysis = Field(...)

class AnalysisTabs(BaseModel):
    """分析标签页模型"""
    overview: Overview = Field(
        ..., description="总览标签页"
    )
    content_analysis: ContentAnalysis = Field(
        ..., description="内容分析标签页"
    )
    speech_analysis: SpeechAnalysis = Field(..., description="语音分析标签页")
    visual_analysis: VisualAnalysis = Field(
        ..., description="视觉分析标签页"
    )


# ------------------------- 主报告模型 -------------------------
class AlgorithmEngineerReport(BaseModel):
    """算法工程师模拟面试报告模型"""
    report_meta: ReportMeta = Field(..., description="报告元数据")
    overall_evaluation: OverallEvaluation = Field(
        ..., description="总体评价"
    )
    ability_radar: AbilityRadar = Field(..., description="能力雷达图")
    analysis_tabs: AnalysisTabs = Field(..., description="分析标签页")
    personalized_suggestions: PersonalizedSuggestions = Field(
        ..., description="个性化建议"
    )
    learning_resources: LearningResources = Field(
        ..., description="学习资源"
    )

# report_data = {
#     # 报告元数据，包含报告的标题和完成时间
#     "report_meta": {
#         "title": "算法工程师模拟面试评测报告",
#         "completion_time": "2025年6月7日 17:45",
#     },
#     # 总体评价，包括总分、评级和超越百分比
#     "overall_evaluation": {
#         "score": 85,  # 总体评分 (0-100)
#         "rating": "优秀",  # 文字评级
#         "percentile": 78,  # 超越同专业求职者的百分比
#     },
#     # 能力雷达图分析
#     "ability_radar": {
#         "labels": ["专业知识", "技能匹配", "语言表达", "逻辑思维", "应变能力", "创新能力"],
#         "scores": [85, 65, 85, 90, 80, 70],  # 各项能力得分 (0-100)，顺序与 labels 对应
#     },
#     # 各个分析维度的详细数据
#     "analysis_tabs": {
#         # 总览标签页
#         "overview": {
#             # 评测总结
#             "summary": {
#                 "text": "你在本次算法工程师模拟面试中表现良好。专业知识扎实，能够清晰地解释机器学习算法原理。语言表达流畅，逻辑思维能力强，能够结构化地阐述问题解决方案。在应对压力问题时表现出良好的应变能力，但在某些技术细节上可以更加深入。",
#                 "strengths": [  # 优点列表
#                     "专业知识扎实，对机器学习算法原理理解深入",
#                     "语言表达清晰流畅，能够使用专业术语准确表达",
#                     "回答问题有条理，逻辑结构清晰",
#                     "能够结合实际项目经验阐述问题",
#                 ],
#                 "improvements": [  # 改进空间列表
#                     "在讨论大规模数据处理时，可以提供更多具体的优化策略",
#                     "回答问题时眼神接触不足，可以增加与摄像头的互动",
#                     "部分回答缺乏STAR结构，可以更加注重结果和影响的阐述",
#                     "在讨论项目经验时，可以更加突出个人贡献和解决的具体挑战",
#                 ],
#             },
#             # 关键问题分析
#             "key_questions": [
#                 {
#                     "question": "问题1：请解释一下梯度下降算法的原理",
#                     "analysis": "你的回答清晰地解释了梯度下降的数学原理和应用场景，展示了扎实的机器学习基础知识。但可以进一步讨论不同变体（如随机梯度下降、批量梯度下降）的优缺点和适用场景。",
#                     "tag": {
#                         "category": "专业知识",
#                         "rating": "优秀",
#                         "level": "excellent" # 用于前端控制样式, e.g., 'excellent', 'good', 'fair', 'poor'
#                     },
#                 },
#                 {
#                     "question": "问题2：你如何处理数据中的缺失值和异常值？",
#                     "analysis": "你提供了多种处理缺失值的方法，包括删除、插补和模型预测，并讨论了各自的适用场景。在异常值处理上，可以更详细地讨论异常检测算法和统计方法。",
#                     "tag": {
#                         "category": "技能匹配",
#                         "rating": "良好",
#                         "level": "good"
#                     },
#                 },
#             ],
#         },
#         # 内容分析标签页
#         "content_analysis": {
#             # 专业知识评估
#             "knowledge_assessment": [
#                 {"skill": "机器学习基础概念", "score": 90},
#                 {"skill": "算法复杂度分析", "score": 85},
#                 {"skill": "深度学习知识", "score": 75},
#                 {"skill": "数据处理技术", "score": 80},
#             ],
#             # 回答内容中的关键词
#             "keywords": [
#                 "梯度下降", "机器学习", "数据清洗", "神经网络",
#                 "优化算法", "特征工程", "模型评估"
#             ],
#             # STAR 结构分析
#             "star_structure": {
#                 "scores": {
#                     "situation": 90, # 情境 (S)
#                     "task": 85,      # 任务 (T)
#                     "action": 75,    # 行动 (A)
#                     "result": 70,    # 结果 (R)
#                 },
#                 "summary": "你在描述情境和任务方面表现出色，但在阐述具体行动和量化结果方面有提升空间。建议在讨论项目经验时，更加详细地描述你采取的具体步骤和取得的可量化成果。",
#             },
#         },
#         # 语音分析标签页
#         "speech_analysis": {
#             "speech_rate": {
#                 "value": 45,  # 语速在标准范围内的位置 (0-100)，50为适中
#                 "summary": "你的语速适中，有助于清晰地传达信息。在技术概念解释时，适当放慢语速有助于听众理解。",
#             },
#             # 语调与情感分析
#             "tone_emotion": [
#                 {"emotion": "自信", "score": 85},
#                 {"emotion": "热情", "score": 70},
#                 {"emotion": "专业", "score": 90},
#                 {"emotion": "紧张", "score": 25},
#             ],
#             # 语言清晰度
#             "clarity": {
#                 "score": 85,
#                 "summary": "你的发音清晰，专业术语使用准确，有助于面试官理解你的回答。",
#             },
#         },
#         # 视觉分析标签页
#         "visual_analysis": {
#             # 面部表情分析
#             "facial_expression": [
#                 {"expression": "自信", "emoji": "😊", "percentage": 65},
#                 {"expression": "思考", "emoji": "🤔", "percentage": 25},
#                 {"expression": "中性", "emoji": "😐", "percentage": 10},
#             ],
#             # 眼神接触分析
#             "eye_contact": {
#                 "score": 60,
#                 "summary": "你的眼神接触频率适中，但可以进一步增加与摄像头的直接接触，以展示更强的自信和专注。",
#             },
#             # 肢体语言分析
#             "body_language": [
#                 {"aspect": "坐姿端正", "score": 90},
#                 {"aspect": "手势表达", "score": 70},
#                 {"aspect": "面部朝向", "score": 85},
#             ],
#         },
#     },
#     # 个性化建议
#     "personalized_suggestions": {
#         "immediate_improvements": [  # 立即改进项
#             "增加眼神接触频率，直视摄像头",
#             "使用STAR结构完整回答行为问题",
#             "在技术回答中增加更多具体实例",
#         ],
#         "long_term_enhancements": [  # 长期提升项
#             "深入学习深度学习前沿技术",
#             "积累更多大规模项目经验",
#             "提升公开演讲和表达技巧",
#         ],
#     },
#     # 推荐学习资源
#     "learning_resources": {
#         "technical_improvement": [  # 技术提升资源
#             {"title": "深度学习专项课程", "url": "#"},
#             {"title": "大数据处理实战", "url": "#"},
#             {"title": "算法设计与分析", "url": "#"},
#         ],
#         "interview_skills": [  # 面试技巧资源
#             {"title": "STAR回答法训练", "url": "#"},
#             {"title": "技术面试题库", "url": "#"},
#             {"title": "表达技巧提升", "url": "#"},
#         ],
#         "full_path_url": "#"  # 查看完整学习路径的链接
#     }
# }