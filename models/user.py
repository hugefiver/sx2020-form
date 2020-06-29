from hashlib import md5
from typing import Dict, Tuple, List, Union

from utils import rand_str


class UserLevel:
    anonymous = 0
    normal = 1
    admin = 9


class User:
    name: str
    id: str
    email: str
    level: int
    secret: Tuple[str, str]
    forms: List[str]

    @classmethod
    def from_map(cls, json: Dict):
        tmp = cls()
        tmp.name = json['name']
        tmp.id = json['id']
        tmp.email = json['email']
        tmp.level = json['level']
        tmp.secret = json['secret'].split('$', maxsplit=2)
        tmp.forms = json['forms']
        return tmp

    @staticmethod
    def get_hash_text(text: str, *,
                      salt: Union[bool, str] = True,
                      sep='$'):
        salt = (rand_str(4)
                if salt is True
                else ('' if salt is False
                      else salt))
        _t = f'{text}{sep}{salt}'
        return md5(_t.encode('utf-8')).hexdigest(), salt

    def check_secret(self, pw: str) -> bool:
        return self.secret[0] == \
               self.get_hash_text(pw, salt=self.secret[1])[0]

    def to_map(self):
        return {
            'name': self.name,
            '_id': self.id,
            'email': self.email,
            'level': self.level,
            'secret': '$'.join(self.secret),
            'forms': self.forms,
        }
