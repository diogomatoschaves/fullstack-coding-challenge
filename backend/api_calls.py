import requests
from urllib.parse import urljoin
# from models import TranslationJobs
# from app import db

BASE_URL = 'https://sandbox.unbabel.com/tapi/v2/translation/'

username = 'fullstack-challenge'
api_key = '9db71b322d43a6ac0f681784ebdcc6409bb83359'

def initialize_translation(data):

    headers = {
        "Authorization": "ApiKey {}:{}".format(username, api_key),
        "Content-Type": "application/json"
    }

    payload = {
        'text': data['text'],
        "source_language": data['sourceLang'],
        "target_language": data['targetLang'],
        "text_format": "text"
    }

    url = BASE_URL

    try:
        r = requests.post(url, headers=headers, json=payload)
        if r.status_code < 400:
            return r.json()
        else:
            return None

    except requests.exceptions.RequestException as e:
        return None


def check_translation(uid):

    headers = {
        "Authorization": "ApiKey {}:{}".format(username, api_key),
        "Content-Type": "application/json"
    }

    url = urljoin(BASE_URL, '{}/'.format(uid))

    try:
        r = requests.get(url, headers=headers)
        if r.status_code < 400:
            return r.json()
        else:
            return None

    except requests.exceptions.RequestException as e:
        print(e)
        return None