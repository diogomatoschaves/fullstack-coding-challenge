from flask import Flask
import os
from models import db, TranslationJobs
from flask import request
from flask import jsonify
from flask_cors import CORS
from rq import Queue
from rq.job import Job, NoSuchJobError
from worker import conn
from functions import check_translation, initialize_translation

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors = CORS(app, resources={
    r"/new_translation": {"origins": "*"},
    r'/check_confirmation*': {"origins": "*"},
    r"/check_status/*": {"origins": "*"},
})

q = Queue(connection=conn)

db.init_app(app)

print(os.environ['APP_SETTINGS'])

@app.route('/')
def hello():
    return "Hello World!"

username = 'fullstack-challenge'
api_key = '9db71b322d43a6ac0f681784ebdcc6409bb83359'


@app.route('/new_translation', methods=['POST'])
def translation():

    data = request.get_json(force=True)

    translation_job = TranslationJobs(
        original_text=data['text'],
        translated_text='',
        source_lang=data['sourceLang'],
        target_lang=data['targetLang'],
        uid='',
        text_format='',
        status='requesting'
    )

    db.session.add(translation_job)
    db.session.commit()

    job_id = q.enqueue(initialize_translation, data)

    return jsonify({'job_id': job_id.get_id(), 'translation_job': str(translation_job.id)})

    # return "Hello {}!".format(name)

@app.route("/check_confirmation", methods=['GET'])
def check_confirmation():

    job_key = request.args.get('jobId')
    id = request.args.get('id')

    try:
        job = Job.fetch(job_key, connection=conn)

        if job.is_finished:

            response = job.result

            translation_job = TranslationJobs.query.filter_by(id=id).first()

            translation_job.uid = response['uid'] if 'uid' in response else ''
            translation_job.status = 'pending'

            db.session.add(translation_job)
            db.session.commit()

            return jsonify(job.result)

        elif job.is_queued:
            return jsonify({"status": 'in-queue'})

        elif job.is_started:
            return jsonify({"status": 'waiting'})

        elif job.is_failed:
            return jsonify({"status": 'failed'})

    except NoSuchJobError:
        return jsonify({"status": 'unexistant'})


@app.route("/check_status", methods=['GET'])
def check_status():

    uid = request.args.get('uid')
    id = request.args.get('id')

    response = check_translation(uid)

    if not response:
        return jsonify({'status': 'error'})

    if 'status' in response['status'] and response['status'] == 'completed':

        if 'translatedText' in response and response['translatedText']:

            translation_job = TranslationJobs.query.filter_by(id=id).first()

            translation_job.translated_text = response['translatedText']
            translation_job.status = 'completed'

            db.session.add(translation_job)
            db.session.commit()

    return jsonify(response)


if __name__ == '__main__':
    app.run()