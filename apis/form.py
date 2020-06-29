from flask import Blueprint, request, json
from bson import ObjectId
from datetime import datetime as dt

from flask_jwt_extended import jwt_required, get_jwt_identity

from models.database import db
from apis.utils import resp_data, make_json

form = Blueprint('form', __name__)


@form.route('/<string:form_id>', methods=['GET'])
def get_form(form_id):
    cl = db().get_collection('forms')

    data = cl.find_one({'_id': ObjectId(form_id)})
    if not data:
        return resp_data(-1, msg=f"form '{form_id}' not found")

    del data['_id']
    return resp_data(0, msg=f"form '{form_id}' found",
                     data=data)


@form.route('/', methods=['POST'], strict_slashes=False)
@jwt_required
def new_form():
    cl = db().get_collection('forms')
    data = request.get_json()
    logged_user = get_jwt_identity()

    if not data:
        return resp_data(-1, msg="json parsing error")

    for i in ['_id', 'time']:
        if i in data:
            return resp_data(-2, msg=f"not allow '{i}'")

    data['creator'] = logged_user['id']
    data['time'] = dt.now().isoformat()

    form_id = cl.insert_one(data)
    if not form_id:
        return resp_data(-3, msg='unknown error')

    return resp_data(0, msg='form created',
                     data={'id': str(form_id.inserted_id)})
