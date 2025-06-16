from enum import IntEnum, auto
from typing import Union

from pydantic import BaseModel


class MessageType(IntEnum):
    AI = auto()
    USER = auto()
    TIP = auto()


class Message(BaseModel):
    type: MessageType
    content: str

class DataMessage(BaseModel):
    type: str # control | message
    data: Union[str, bytes, Message]