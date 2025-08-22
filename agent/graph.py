import logging

from langchain_core.messages import AIMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableConfig

from agent.configuration import Configuration
from agent.model import chat_model, report_model
from agent.models.report import AlgorithmEngineerReport
from agent.prompts import GENERATE_SUBJECT_SYSTEM_PROMPT, GENERATE_REPORT_SYSTEM_PROMPT, GENERATE_SUBJECT_USER_PROMPT, \
    GENERATE_REPORT_USER_PROMPT
from agent.state import State, QA
from agent.tool.resume import analyze_resume

tools = [analyze_resume]

model_with_model = chat_model.bind_tools(tools)

report_chat_model = report_model.with_structured_output(schema=AlgorithmEngineerReport, method='json_schema')


def receive_resume(state: State):
    """接收用户的简历"""
    logging.info('receive resume invoked')
    return {
        'messages': [AIMessage(content='请先提交你的简历。')]
    }


def analyze_resume(state: State):
    """解析简历"""
    logging.info('analyze resume invoked')
    response = model_with_model.invoke(state['messages'])
    # TODO 可以用llm对简历先进行一个评分
    return {
        'messages': [response],
    }


def self_introduction(state: State):
    """自我介绍"""
    logging.info('self introduction invoked')
    return {
        'messages': [AIMessage(content='接下来请进行自我介绍。')]
    }


def project_introduction(state: State):
    """项目经验介绍"""
    logging.info('project introduction invoked')
    return {
        'messages': [AIMessage(content='接下来请进行项目经验介绍。')]
    }


def self_evaluation(state: State):
    """自我评价"""
    logging.info('self evaluation invoked')
    return {
        'messages': [AIMessage(content='接下来请进行自我评价。')]
    }


def generate_subject(state: State, config: RunnableConfig):
    """生成题目"""
    logging.info('generate subject invoked')
    configuration = Configuration.from_runnable_config(config)
    prompt = ChatPromptTemplate(
        [
            ('system', GENERATE_SUBJECT_SYSTEM_PROMPT),
            ('human', GENERATE_SUBJECT_USER_PROMPT)
        ]
    )

    subjects = state.get('subjects', {})

    history_str = "\n".join(
        [f"Q:{q.question}\nA:{q.answer}"
         for q in subjects.values()]
    )

    logging.info(f'history: {history_str}')

    messages = prompt.invoke(
        {
            'job_position': configuration.job_position,
            'resume': state['resume'],
            'history': history_str,
            'count': state['current_question_index'],
            'max_count': configuration.max_subject_number,
        }
    )
    response = chat_model.invoke(messages, config=config)
    subjects[state['current_question_index']] = QA(question=response.content, answer=None, ratio=None)
    return {
        'messages': [response],
        'subjects': subjects,
    }


def answer_question(state: State):
    """回答问题"""
    pass


def generate_report_route(state: State, config: RunnableConfig):
    """报告路由"""
    logging.info('generate report route invoked')
    configuration = Configuration.from_runnable_config(config)
    max_subject_number = configuration.max_subject_number
    return state['current_question_index'] >= max_subject_number


def generate_report(state: State, config: RunnableConfig):
    logging.info('generate report invoked')
    configuration = Configuration.from_runnable_config(config)
    prompt = ChatPromptTemplate(
        [
            ('system', GENERATE_REPORT_SYSTEM_PROMPT),
            ('human', GENERATE_REPORT_USER_PROMPT)
        ]
    )
    qa_str = "\n\n".join(
        [f"第{i + 1}轮:\n问：{q.question}\n答：{q.answer}\n评价：{q.ratio}"
         for i, q in enumerate(state['subjects'].values())]
    )
    logging.info(f'qa: {qa_str}')
    messages = prompt.invoke(
        {
            'resume': state['resume'],
            'job_position': configuration.job_position,
            'self_intro': state['self_introduction'],
            'project_intro': state['project_introduction'],
            'self_evaluation': state['self_evaluation'],
            'qa_history': qa_str,
        }
    )
    response = report_chat_model.invoke(messages, config=config)
    logging.info(f'report: {response}')
    return {
        'messages': [AIMessage(content=response.json())],
    }
