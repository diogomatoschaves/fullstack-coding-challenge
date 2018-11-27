import unittest
import re
from flask import Flask
from flask_testing import TestCase
from app import app
from models import db, TranslationJobs
from unittest.mock import Mock, patch


TEST_DB = 'test.db'
SQLALCHEMY_DATABASE_URI = "sqlite:///test.db"
TESTING = True

class BaseTestCase(TestCase):

    def create_app(self):
        app.config.from_object('config.TestingConfig')
        return app

    # executed prior to each test
    def setUp(self):

        db.create_all()

    # executed after each test
    def tearDown(self):
        db.session.remove()
        db.drop_all()


class TestAppRoutes(BaseTestCase):

    def new_translation(self, text, sourceLang, targetLang, timeStamp):
        return self.app.test_client().post(
            '/new_translation',
            json=dict(text=text, sourceLang=sourceLang, targetLang=targetLang, timeStamp=timeStamp),

        )

    def confirmation(self, jobId, id):
        return self.app.test_client().get(
            '/check_confirmation?jobId={}&id={}'.format(jobId, id),
            content_type='application/json'
        )

    def check_status(self, uid, id):
        return self.app.test_client().get(
            '/check_status?uid={}&id={}'.format(uid, id),
            content_type='application/json'
        )

    def get_jobs(self):
        return self.app.test_client().get(
            '/get_jobs',
            content_type='application/json'
        )

    def delete_job(self, id):
        return self.app.test_client().get(
            '/delete_job?id={}'.format(id),
            content_type='application/json'
        )



    def index(self):
        return self.app.test_client().get('/')

    def test_translation(self):
        mockData = {"text": "Hello world", "sourceLang": "en", "targetLang": "es", "timeStamp": 1543335821916}
        response = self.new_translation(**mockData)
        response = response.json
        pattern = re.compile('^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$')
        self.assertTrue(pattern.match(response['job_id']))
        self.assertTrue(response['translation_job'] == "1")

    def test_confirmation(self):
        data = {"jobId": "2b378d93-6a46-49a2-a646-d7a3b488a5f3", "id": 1}
        response = self.confirmation(**data)
        self.assertEqual(response.json, {"status": 'unexistant'})

    def test_check_status(self):

        response = self.check_status(uid='r84rhsjn', id=1)
        self.assertEqual(response.json, {"status": 'unexistant'})

    def test_get_jobs(self):

        texts = ['Test', 'Test2', 'Test3', 'Test4']

        for i, text in enumerate(texts):
            translation_job = TranslationJobs(
                original_text=text,
                translated_text='',
                source_lang='en',
                target_lang='es',
                uid='',
                text_format='',
                status='requesting',
                timestamp=(1543335821916 + i) / 1000
            )

            db.session.add(translation_job)

        db.session.commit()

        translation_jobs = TranslationJobs.query.all()

        response = self.get_jobs()
        self.assertEqual(response.json, {
            "jobs":  [job.serialize for job in translation_jobs]
        })

    def test_delete_job(self):
        translation_job = TranslationJobs(
            original_text='Test',
            translated_text='',
            source_lang='en',
            target_lang='es',
            uid='',
            text_format='',
            status='requesting',
            timestamp=1543335821916 / 1000
        )

        db.session.add(translation_job)
        db.session.commit()

        translation_job = TranslationJobs.query.filter_by(id=1).first()

        self.assertEqual(translation_job.serialize, {
            'id': 1,
            'original_text': 'Test',
            'translated_text': '',
            'source_lang': 'en',
            'target_lang': 'es',
            'uid': '',
            'text_format': '',
            'status': 'requesting',
            'timestamp': 1543335821.916
        })

        response = self.delete_job(1)
        self.assertEqual(response.json, {'status': 'deleted'})

        translation_job = TranslationJobs.query.filter_by(id=1).first()

        self.assertEqual(translation_job, None)



if __name__ == "__main__":
    unittest.main()