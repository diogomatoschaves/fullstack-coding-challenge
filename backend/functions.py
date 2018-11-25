import requests
# from models import TranslationJobs
# from app import db


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

    url = 'https://sandbox.unbabel.com/tapi/v2/translation/'

    try:
        r = requests.post(url, headers=headers, json=payload)
        return r.json()

    except requests.exceptions.RequestException as e:
        print(e)
        return {'success': False, 'uid': None}


def check_translation(uid):

    headers = {
        "Authorization": "ApiKey {}:{}".format(username, api_key),
        "Content-Type": "application/json"
    }

    url = 'https://sandbox.unbabel.com/tapi/v2/translation/{}/'.format(uid)

    try:
        r = requests.get(url, headers=headers)
        return r.json()

    except requests.exceptions.RequestException as e:
        print(e)
        return {'success': False, 'uid': None}