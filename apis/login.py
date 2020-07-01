from flask import Blueprint, request, json
from flask_jwt_extended import *
from bson import ObjectId
from datetime import datetime as dt

from apis.user import new_user
from models.database import db
from apis.utils import resp_data, make_json
from models.user import User

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    return new_user()


@auth.route('/login', methods=['POST'], strict_slashes=False)
def login():
    cl = db().get_collection('users')
    d = None
    if request.is_json:
        d = request.json
    else:
        d = request.form

    name = d.get('name')
    password = d.get('password')
    if not name or not password:
        return resp_data(-1, msg=f"'name' and 'password' are required")

    u = cl.find_one({'name': name})
    u['id'] = str(u['_id'])
    if not u:
        return resp_data(-2, msg=f"user '{name}' did not exist")

    if not User.from_map(u).check_secret(password):
        return resp_data(-3, msg='password error')

    token = create_access_token(identity={'name': u['name'],
                                          'id': u['id'],
                                          'level': u['level']})
    return resp_data(0, msg='login successfully',
                     data={'token': token})


@auth.route('/check')
@jwt_required
def check():
    return resp_data(0, msg='logged',
                     data={'user': get_jwt_identity()})


@auth.route('/info')
@jwt_required
def info():
    cl = db().get_collection('users')
    user_id = get_jwt_identity()['id']

    user = cl.find_one({'_id': ObjectId(user_id)})
    if not user:
        return resp_data(-1, msg='user not found')

    del user['_id']
    del user['secret']
    user['id'] = user_id

    return resp_data(0, msg='here are you',
                     data=user)
