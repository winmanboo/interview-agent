import json
import logging
import os

import dashscope
from dashscope import MultiModalConversation
from dashscope.audio.asr import TranslationRecognizerCallback, TranslationRecognizerRealtime
from dashscope.audio.tts_v2 import SpeechSynthesizer, AudioFormat
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from openai import OpenAI

from webrtc.prompts.prompt import DASH_AUDIO_SYSTEM_PROMPT, OUTPUT_FORMAT

load_dotenv()
dashscope.api_key = os.getenv('DASHSCOPE_API_KEY')

client = OpenAI(
    api_key=os.getenv('DASHSCOPE_API_KEY'),
    base_url='https://dashscope.aliyuncs.com/compatible-mode/v1'
)


def voice_recognition(audio_file_path: str, callback: TranslationRecognizerCallback):
    translator = TranslationRecognizerRealtime(
        model="gummy-realtime-v1",
        format="wav",
        sample_rate=48000,
        callback=callback,
    )
    translator.start()
    with open(audio_file_path, "rb") as f:
        while True:
            audio_data = f.read(12000)
            if not audio_data:
                break
            else:
                if translator.send_audio_frame(audio_data):
                    logging.info("Successfully sent audio frame")
                else:
                    logging.info("Failed to sent audio frame")
                    break


def analyze_audio(audio_file_path: str):
    abs_file_path = f'file://{os.path.abspath(audio_file_path)}'
    audio_content = MultiModalConversation.call(model='qwen-audio-asr', messages=[
        {
            'role': 'user',
            'content': [
                {
                    'audio': abs_file_path
                }
            ]
        }
    ]).output.choices[0].message.content
    logging.info(f'audio content: {audio_content}')
    prompt = ChatPromptTemplate(
        [
            ('human', DASH_AUDIO_SYSTEM_PROMPT)
        ]
    ).invoke(
        {
            'output_format': OUTPUT_FORMAT,
            'user_answer': audio_content
        }
    )
    logging.info(f'prompt: {prompt}')
    completion = client.chat.completions.create(
        model='qwen-omni-turbo',
        messages=[
            {
                'role': 'user',
                'content': [
                    {
                        'type': 'text',
                        'text': prompt.to_messages()[0].content
                    }
                ]
            }
        ],
        modalities=['text'],
        stream=True,
        stream_options={"include_usage": True}
    )
    content = ''
    for chunk in completion:
        if chunk.choices:
            content += chunk.choices[0].delta.content
    logging.info(f'dash audio response: {content}')
    try:
        loads = json.loads(content.replace('```json', '').replace('```', ''))
        return {
            'content': loads.get('content', ''),
            'summary': loads.get('summary', '回答总体正常，但缺少举例说明'),
            'sentiment_analysis': loads.get('sentiment_analysis', None),
            'scoring': loads.get('scoring', None)
        }
    except Exception as e:
        return {
            'content': '',
            'summary': '回答总体正常，但缺少举例说明',
            'sentiment_analysis': None,
            'scoring': None,
        }


def generate_audio(text):
    logging.info(f'Generating audio: {text}')
    synthesizer = SpeechSynthesizer(model='cosyvoice-v2', voice='longxiaochun_v2',
                                    format=AudioFormat.PCM_48000HZ_MONO_16BIT)
    return synthesizer.call(text)
