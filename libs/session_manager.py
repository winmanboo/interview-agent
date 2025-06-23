from typing import List, Dict, Optional, Any

from agent import InterviewAgent


class SessionManager:
    def __init__(self):
        super().__init__()
        self.session_table: Dict[str, InterviewAgent] = {}
        self.audio_chunks: Dict[str, List[Any]] = {}

    def put_session(self, session_id: str, agent: InterviewAgent):
        self.session_table[session_id] = agent
        self.audio_chunks[session_id] = []

    def get_session(self, session_id: str) -> Optional[InterviewAgent]:
        if session_id not in self.session_table:
            return None
        else:
            return self.session_table[session_id]

    def recycle_session(self, session_id: str):
        del self.session_table[session_id]