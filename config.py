APP_NAME = 'forms'
DEBUG = True
PORT = 8080
HOST = '127.0.0.1'
ROOT_PATH = '/api'

# session
SESSION_SECRET_KEY = '61=kkyr8c4e733nockao7mbx32-d0xnr'
SESSION_EXPIRE = 60 * 60 * 24  # Seconds

# mongodb
MONGO_URL = 'localhost'
MONGO_PORT = 27017
DB_NAME = 'forms'

# jwt
JWT_SECRET_KEY = u'0Y+YxPDW4J3F92fOPQJ7OpTMusZuW48hmqijHbQtUB0='
JWT_EXPIRE = 60 * 60 * 24 * 30
