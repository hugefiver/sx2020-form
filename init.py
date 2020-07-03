from flask import Flask
from flask_cors import CORS

from common import init_jwt
from config import APP_NAME, SESSION_SECRET_KEY, ROOT_PATH
from config import JWT_SECRET_KEY, JWT_EXPIRE

from apis.user import user
from apis.form import form
from apis.result import result
from apis.login import auth

# create app
app = Flask(APP_NAME)

# CORS
CORS(app)

# jwt
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = JWT_EXPIRE
init_jwt(app)

# sessions
app.config['SECRET_KEY'] = SESSION_SECRET_KEY

# register blueprints

app.register_blueprint(user, url_prefix=ROOT_PATH + '/user')
app.register_blueprint(form, url_prefix=ROOT_PATH + '/form')
app.register_blueprint(result, url_prefix=ROOT_PATH + '/result')
app.register_blueprint(auth, url_prefix=ROOT_PATH + '/auth')


