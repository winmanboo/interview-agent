from enum import IntEnum, auto

from pydantic import BaseModel


class MessageType(IntEnum):
    AI = auto()
    USER = auto()
    TIP = auto()
    CUSTOM = auto()


class Message(BaseModel):
    type: MessageType
    content: str
