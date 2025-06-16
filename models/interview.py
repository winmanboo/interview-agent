from extensions.ext_database import db


class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(32), nullable=False)


class Scene(db.Model):
    __tablename__ = 'scene'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    topic = db.Column(db.String(32), nullable=False)
    """面试主题"""
    estimated_time = db.Column(db.String(32), nullable=False)
    """预估面试时间"""
    difficulty = db.Column(db.SmallInteger, nullable=False)
    """面试难度 1-容易 2-中等 3-困难"""
    introduction = db.Column(db.String(128), nullable=False)
    """介绍"""
    tags = db.Column(db.String(128), nullable=False)
    """标签（逗号分隔）"""
    category_id = db.Column(db.Integer, nullable=False)
