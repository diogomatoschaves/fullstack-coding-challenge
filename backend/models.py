# from .app import db
from sqlalchemy.dialects.postgresql import JSON
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TranslationJobs(db.Model):
    __tablename__ = 'translation_jobs'

    id = db.Column(db.Integer, primary_key=True)
    original_text = db.Column(db.String())
    translated_text = db.Column(db.String())
    source_lang = db.Column(db.String())
    target_lang = db.Column(db.String())
    uid = db.Column(db.String())
    text_format = db.Column(db.String())
    status = db.Column(db.String())

    # def __init__(self, url, result_all, result_no_stop_words):
    #     self.url = url
    #     self.result_all = result_all
    #     self.result_no_stop_words = result_no_stop_words
    #
    # def __repr__(self):
    #     return '<id {}>'.format(self.id)