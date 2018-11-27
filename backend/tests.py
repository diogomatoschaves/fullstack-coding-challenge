import unittest
import re
from flask import Flask
from flask_testing import TestCase
from app import app
from models import db, TranslationJobs
from unittest.mock import Mock, patch, MagicMock
import time
from fakeredis import FakeStrictRedis
from rq import Queue
import worker


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
    def assign_result(self):
        return {
            "balance": 99937.0,
            "client": "username",
            "price": 6.0,
            "source_language": "en",
            "status": "completed",
            "target_language": "pt",
            "text": "Hello, world!",
            "text_format": "text",
            "translatedText": "Olá Mundo!",
            "uid": "ac1a53a264"
        }

    # def mock_initialize_translation(self):
    #
    #     data = {
    #         "balance": 99937.0,
    #         "client": "username",
    #         "price": 6.0,
    #         "source_language": "en",
    #         "status": "completed",
    #         "target_language": "pt",
    #         "text": "Hello, world!",
    #         "text_format": "text",
    #         "translatedText": "Olá Mundo!",
    #         "uid": "ac1a53a264"
    #     }
    #
    #     job_id = '11976468-fd6f-4bec-a71e-73b0eec98703'
    #
    #     connection = worker.conn
    #     connection.set(job_id, data)
    #     print(connection.get('a'))
    #
    #     return self.mock_job_class()
    #
    class mock_job_class():

        def get_id(self):

            return '11976468-fd6f-4bec-a71e-73b0eec98703'


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

    # @patch('queue_args.get_conn')
    # @patch('queue_args.get_queue')
    # @patch('api_calls.initialize_translation')
    def test_new_translation(self):# mock_initialize_translation):

        # with patch('queue_args.get_conn') as mock_connection:
        with patch('queue_args.enqueue') as mock_enqueue:
        # with patch('api_calls.requests.post') as mock_initialize_translation:
        # with patch('api_calls.initialize_translation') as mock_initialize_translation:

            # mock_initialize_translation.return_value = Mock(self.assign_result())
            # mock_connection.return_value = FakeStrictRedis()
            # mock_queue.return_value = Queue(connection=worker.conn)
            mock_enqueue.return_value = self.mock_job_class()
            # mock_initialize_translation.return_value = MagicMock(status_code=200, json=self.assign_result)

            mockData = {"text": "Hello world", "sourceLang": "en", "targetLang": "es", "timeStamp": 1543335821916}
            response = self.new_translation(**mockData)
            response = response.json
            pattern = re.compile('^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$')
            self.assertTrue(pattern.match(response['job_id']))
            self.assertTrue(response['translation_job'] == "1")

            job_id = response['job_id']

            data = {"jobId": "84857huwdhu", "id": 1}
            response = self.confirmation(**data)
            self.assertEqual(response.json, {"status": 'unexistant'})

            data = {"jobId": job_id, "id": 1}
            response = self.confirmation(**data)
            if len(response.json) > 2:
                self.assertEqual(response.json, {
                    "balance": 99943.0,
                    "client": "username",
                    "price": 6.0,
                    "source_language": "en",
                    "status": "new",
                    "target_language": "pt",
                    "text": "Hello, world!",
                    "text_format": "text",
                    "uid": "ac1a53a264"
                })
            else:
                print(response.json)




    # def test_confirmation(self):


    # @patch('api_calls.requests.get')
    @patch('api_calls.requests.get')
    def test_check_status(self, mock_check_translation):

        mock_check_translation.return_value = Mock(status_code=200, json=self.assign_result)

        translation_job = TranslationJobs(
            original_text="Hello, world!",
            translated_text="",
            source_lang="en",
            target_lang="es",
            uid="ac1a53a264",
            text_format="text",
            status="pending",
            timestamp=1543335821916 / 1000
        )

        db.session.add(translation_job)
        db.session.commit()

        response = self.check_status(uid="ac1a53a264", id=1)
        self.assertEqual(response.json, self.assign_result())

        translation_job = TranslationJobs.query.filter_by(id=1).first().serialize
        self.assertEqual(translation_job, {
            'id': 1,
            'original_text': 'Hello, world!',
            'translated_text': 'Olá Mundo!',
            'source_lang': 'en',
            'target_lang': 'es',
            'uid': 'ac1a53a264',
            'text_format': 'text',
            'status': 'completed',
            'timestamp': 1543335821.916
        })


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