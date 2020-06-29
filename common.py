from flask_jwt_extended import JWTManager

jwt = None


def init_jwt(app=None):
    global jwt
    jwt = JWTManager(app)
    return jwt
