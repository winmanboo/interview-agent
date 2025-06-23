import os
import ssl
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent


class Config:
    # 基础配置
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 8080))
    DEBUG = bool(os.getenv('DEBUG', False))

    # CORS 配置
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')

    # SSL 配置
    SSL_CERT_FILE = os.getenv('SSL_CERT_FILE')
    SSL_KEY_FILE = os.getenv('SSL_KEY_FILE')

    @property
    def ssl_context(self):
        if self.SSL_CERT_FILE and self.SSL_KEY_FILE:
            ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
            ssl_context.load_cert_chain(self.SSL_CERT_FILE, self.SSL_KEY_FILE)
            return ssl_context
        return None


config = Config()