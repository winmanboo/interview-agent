from enum import IntEnum, auto

from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, START, END

from agent.graph import analyze_resume, receive_resume, self_evaluation, project_introduction, self_introduction, \
    generate_report, generate_report_route, generate_subject, answer_question
from agent.state import State, Ratio


def _init_graph():
    graph = StateGraph(State)

    graph.add_node('receive_resume_node', receive_resume)
    graph.add_node('analyze_resume_node', analyze_resume)
    graph.add_node('self_introduction_node', self_introduction)
    graph.add_node('project_introduction_node', project_introduction)
    graph.add_node('self_evaluation_node', self_evaluation)
    graph.add_node('generate_subject_node', generate_subject)
    graph.add_node('answer_question_node', answer_question)
    graph.add_node('generate_report_node', generate_report)

    graph.add_edge(START, 'receive_resume_node')
    graph.add_edge('receive_resume_node', 'analyze_resume_node')
    graph.add_edge('analyze_resume_node', 'self_introduction_node')
    graph.add_edge('self_introduction_node', 'project_introduction_node')
    graph.add_edge('project_introduction_node', 'self_evaluation_node')
    graph.add_edge('self_evaluation_node', 'generate_subject_node')
    graph.add_edge('generate_subject_node', 'answer_question_node')
    graph.add_edge('answer_question_node', END)
    graph.add_conditional_edges('answer_question_node', generate_report_route, {
        False: "generate_subject_node",
        True: "generate_report_node"
    })

    checkpointer = MemorySaver()

    return graph.compile(
        checkpointer=checkpointer,
        interrupt_after=[
            'receive_resume_node',
            'answer_question_node',
            'self_introduction_node',
            'project_introduction_node',
            'self_evaluation_node',
        ],
    )


class InterviewStatus(IntEnum):
    SELF_INTRO = auto()
    PROJECT_INTRO = auto()
    SELF_EVALUATION = auto()
    ANSWER_QUESTION = auto()
    END = auto()


class InterviewAgent:
    def __init__(self, session_id, position):
        super().__init__()
        self.app = _init_graph()
        self.session_id = session_id
        self.inputs = {
            'current_question_index': 0,
        }
        # TODO 可配置化
        self.max_subject_number = 1
        self.config = {
            'configurable': {
                'thread_id': self.session_id,
            },
            'job_position': position,
            'max_subject_number': self.max_subject_number
        }
        self.next_status = None

        self.handler = {
            InterviewStatus.SELF_INTRO: self.self_introduction,
            InterviewStatus.PROJECT_INTRO: self.project_introduction,
            InterviewStatus.SELF_EVALUATION: self.self_evaluation,
            InterviewStatus.ANSWER_QUESTION: self.answer_question,
        }

    def commit_resume(self, resume):
        self.app.update_state(
            self.config,
            {
                'resume': resume
            },
            as_node='receive_resume_node',
        )
        self.app.invoke(None, self.config, stream_mode='values')
        self.next_status = InterviewStatus.SELF_INTRO
        return self.app.get_state(self.config).values['messages'][-1].content

    def self_introduction(self, introduction: str, ratio: Ratio):
        """自我介绍"""
        self.app.update_state(
            self.config,
            {
                'messages': [HumanMessage(content=introduction)],
                'self_introduction': introduction,
                'self_introduction_ratio': ratio
            },
            as_node='self_introduction_node'
        )
        self.app.invoke(None, self.config, stream_mode='values')
        self.next_status = InterviewStatus.PROJECT_INTRO
        return self.app.get_state(self.config).values['messages'][-1].content

    def project_introduction(self, introduction: str, ratio: Ratio):
        """项目经验介绍"""
        self.app.update_state(
            self.config,
            {
                'messages': [HumanMessage(content=introduction)],
                'project_introduction': introduction,
                'project_introduction_ratio': ratio
            },
            as_node='project_introduction_node'
        )
        self.app.invoke(None, self.config, stream_mode='values')
        self.next_status = InterviewStatus.SELF_EVALUATION
        return self.app.get_state(self.config).values['messages'][-1].content

    def self_evaluation(self, content: str, ratio: Ratio):
        """自我评价"""
        self.app.update_state(
            self.config,
            {
                'messages': [HumanMessage(content=content)],
                'self_evaluation': content,
                'self_evaluation_ratio': ratio
            },
            as_node='self_evaluation_node'
        )
        self.app.invoke(None, self.config, stream_mode='values')
        self.next_status = InterviewStatus.ANSWER_QUESTION
        return self.app.get_state(self.config).values['messages'][-1].content

    def answer_question(self, content: str, ratio: Ratio):
        """回答问题"""
        current_state = self.app.get_state(self.config).values
        current_question_index = current_state['current_question_index']
        subjects = current_state['subjects']
        subjects[current_question_index].ratio = ratio
        subjects[current_question_index].answer = content
        self.app.update_state(
            self.config,
            {
                'messages': [HumanMessage(content=content), ],
                'current_question_index': current_question_index + 1,
                'subjects': subjects,
            },
            as_node='answer_question_node'
        )
        self.app.invoke(None, self.config, stream_mode='values')
        if current_question_index + 1 >= self.max_subject_number:
            self.next_status = InterviewStatus.END
        return self.app.get_state(self.config).values['messages'][-1].content

    def start(self):
        return self.app.stream(input=self.inputs, config=self.config, stream_mode='values')

    def is_ended(self):
        return self.next_status == InterviewStatus.END
