import json
import logging

import dashscope
from dashscope import MultiModalConversation
from dashscope.audio.asr import TranslationRecognizerCallback, TranslationRecognizerRealtime
from dashscope.audio.tts_v2 import SpeechSynthesizer, AudioFormat

from agent.prompts import DASH_AUDIO_SYSTEM_PROMPT
from configs import interview_config

dashscope.api_key = interview_config.DASHSCOPE_API_KEY

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
    response = MultiModalConversation.call(model='qwen-audio-turbo-latest', messages=[
        {
            'role': 'user',
            'content': [
                {
                    'audio': audio_file_path,
                },
                {
                    'text': DASH_AUDIO_SYSTEM_PROMPT
                }
            ]
        }
    ])
    logging.info(f'dash audio response: {response}')
    return json.loads(response.output.choices[0].message.content[0]['text'].replace('```json', '').replace('```', ''))

def generate_audio(text):
    logging.info(f'Generating audio: {text}')
    synthesizer = SpeechSynthesizer(model='cosyvoice-v2', voice='longxiaochun_v2', format=AudioFormat.PCM_48000HZ_MONO_16BIT)
    return synthesizer.call(text)