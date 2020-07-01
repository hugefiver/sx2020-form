from flask import Blueprint, request, json
from bson import ObjectId

from models.database import db
from apis.utils import resp_data, make_json
from models.user import User

user = Blueprint('user', __name__)


@user.route('/<string:user_id>', methods=['GET'])
def get_user(user_id: str):
    cl = db().get_collection('users')

    data = cl.find_one({"_id": ObjectId(user_id)})
    if not data:
        return resp_data(-1, msg='user not found')

    del data['secret']
    del data['_id']
    return resp_data(0, msg='user found', data=data)


@user.route('/', methods=['POST'], strict_slashes=False)
def new_user():
    return new_user_fun()


def new_user_fun():
    cl = db().get_collection('users')
    data = request.get_json()

    # check requiring keys
    for i in ['name', 'email', 'secret']:
        if i not in data:
            return resp_data(-1, msg=f"requires '{i}'")

    # check not allow
    for i in ['_id', 'level', 'forms']:
        if i in data:
            return resp_data(-2, msg=f"not allow '{i}'")

    # check exists user
    email = data['email']
    name = data['name']
    r = cl.find_one({"$or": [{'name': name}, {'email': email}]})
    if r:
        return resp_data(-3, msg=f"user email='{email}' "
                                 f"or name='{name}' exists")

    pw = data['secret']
    pw, salt = User.get_hash_text(pw)
    data['secret'] = f'{pw}${salt}'
    data['level'] = 1
    data['forms'] = []

    user_id = cl.insert_one(data)
    user_id = str(user_id.inserted_id)
    return resp_data(0, msg=f'created user',
                     data={'id': user_id})


