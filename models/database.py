import pymongo as mg

from config import MONGO_URL as URL
from config import MONGO_PORT as PORT
from config import DB_NAME

_client = None


def db():
    global _client
    if not _client:
        _client = mg.MongoClient(host=URL, port=PORT)
    return _client.get_database(DB_NAME)
