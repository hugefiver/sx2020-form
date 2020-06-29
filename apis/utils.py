from flask import jsonify


def resp_data(stat, data={}, msg=''):
    return jsonify(status=stat, msg=msg, data=data)


def make_json(**kw):
    return kw
