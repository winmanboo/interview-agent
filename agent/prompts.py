GENERATE_SUBJECT_SYSTEM_PROMPT = """你是一位资深面试官，正在面试{job_position}岗位的候选人。"""
GENERATE_SUBJECT_USER_PROMPT = """
候选人简历：
{resume}

已进行的面试对话：
{history}

请基于以下内容提出一个深入的技术或行为问题（问题数量为1，且内容不要超过50字）：
1. 简历中的疑点或亮点
2. 项目介绍中的技术细节
3. 自我评价中的矛盾点
4. 之前回答的后续追问

当前问答轮次：{count}/{max_count}
问题要求：专业、有挑战性、与岗位相关
再次声明，只需要生成问题本身，不要预先生成其他内容，并且数量为1。
"""

GENERATE_REPORT_SYSTEM_PROMPT = """你是一位资深的HR专家，需要生成面试评估报告。"""
GENERATE_REPORT_USER_PROMPT = """
候选人资料：
- 简历：{resume}
- 求职岗位：{job_position}
- 自我介绍：{self_intro}
- 项目介绍：{project_intro}
- 自我评价：{self_evaluation}

面试问答记录：
{qa_history}

请生成报告（严格要求JSON结构），包含：
1. 专业知识水平评估（0-10分）
2. 技能匹配度评估（0-10分）
3. 语言表达能力评估（0-10分）
4. 逻辑思维能力评估（0-10分）
5. 创新能力评估（0-10分）
6. 应变抗压能力（0-10分）
7. 优势与亮点分析
8. 主要不足与改进建议
9. 整体推荐评级（A/B/C/D）
10. 详细的综合评价（200字左右）
"""