from flask import Blueprint, request, json
from bson import ObjectId
from datetime import datetime as dt

from flask_jwt_extended import jwt_required, get_jwt_identity

from models.database import db
from apis.utils import resp_data, make_json

result = Blueprint('result', __name__)


@result.route('/', methods=['GET'], strict_slashes=False)
@jwt_required
def get_results():
    cl = db().get_collection('results')

    form_id = request.args.get('form')
    if not form_id:
        return resp_data(-1, msg='no form selected')

    rs = cl.find({'form_id': form_id})
    if not rs:
        return resp_data(1, msg='no result yet',
                         data=[])
    data = []
    for r in rs:
        r: dict
        r['result_id'] = str(r.pop('_id'))
        r.pop('form_id')
        data.append(r)
    return resp_data(0, msg='results found',
                     data=data)


@result.route('/<result_id>')
@jwt_required
def get_result(result_id):
    cl = db().get_collection('results')

    data = cl.find_one({'_id': ObjectId(result_id)})
    if not data:
        return resp_data(-1, msg=f"form result '{result_id}' not found")

    del data['_id']
    return resp_data(0, msg='found',
                     data=data)


@result.route('/', methods=['POST'], strict_slashes=False)
@jwt_required
def new_result():
    cl = db().get_collection('results')
    data = request.get_json()
    logged_user = get_jwt_identity()

    if not data:
        return resp_data(-1, msg='unknown error')

    for i in ['_id', 'time']:
        if i in data:
            return resp_data(-2, msg=f"not allow '{i}'")

    for i in ['form_id', 'data']:
        if i not in data:
            return resp_data(-3, msg=f"require '{i}'")

    data['user'] = logged_user['id']
    data['time'] = dt.now().isoformat()
    result_id = cl.insert_one(data)
    if not result_id:
        return resp_data(-4, msg="unknown error")
    return resp_data(0, msg="created form result",
                     data={'id': str(result_id.inserted_id)})
