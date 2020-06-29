from random import choice

_chars = r'1234567890abcdefghijklmnopqrstuvwxyz' \
         r'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


def rand_str(length: int):
    cs = [choice(_chars) for _ in range(0, length)]
    return ''.join(cs)
