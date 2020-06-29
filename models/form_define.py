import uuid
from datetime import datetime
from dateutil import parser
from typing import Union, List, Mapping, Dict


class BaseForm:
    type = 'base'
    key: int
    require: bool
    ask: str
    limit: Mapping[str, Union[int, str]] = None

    def __init__(self, key: int, ask='',
                 require=True,
                 limit: Mapping[str, Union[int, str]] = None):
        self.ask = ask
        self.key = key
        self.require = require
        self.limit = limit if limit else {}


class IntForm(BaseForm):
    type = 'int'

    def __init__(self, key, ask='',
                 require=True, limit=None):
        super().__init__(key, ask, require)
        self.limit = limit if limit else {
            'max': 100,
            'min': 0,
        }


class TextForm(BaseForm):
    type = 'text'

    def __init__(self, key, ask='',
                 require=True, limit=None):
        super().__init__(key, ask, require)
        self.limit = limit if limit else {'maxlength': 200}


class ShortTextForm(TextForm):
    type = "short_text"

    def __init__(self, key, ask='',
                 require=True, limit=None):
        super().__init__(key, ask, require)
        self.limit = limit if limit else {'maxlength': 20}


class ChoiceForm(BaseForm):
    type = 'base_choice'
    Choice = Mapping[str, str]
    choices: List[Choice]

    def __init__(self, key, ask='',
                 require=True, limit=None,
                 choices: List[Choice] = None):
        super().__init__(key, ask, require)
        self.choices = choices if choices else []
        self.limit = limit if limit else {
            'max': 4,
            'min': 1,
        }


class SingleChoiceForm(ChoiceForm):
    type = 'choice'

    def __init__(self, key, ask='',
                 require=True,
                 choices: List[ChoiceForm.Choice] = None):
        super().__init__(key, ask, require)
        self.choices = choices if choices else []


class MultiChoiceForm(ChoiceForm):
    type = 'multi_choice'


class FormDefine:
    title: str
    creator: str
    time: datetime

    FormType = Union[IntForm, TextForm,
                     ShortTextForm,
                     SingleChoiceForm,
                     MultiChoiceForm]
    _forms: List[FormType] = []

    def __init__(self, title: str, creator: str, create_time: datetime):
        self.title = title
        self.creator = creator
        self.time = create_time

    def append_form(self, *form_list):
        self._forms += form_list

    @property
    def forms(self):
        return self._forms

    @forms.setter
    def forms(self, form_list):
        self._forms = form_list


def from_map(mapping: Dict) -> FormDefine:
    creator: str = (mapping['creator']
                    if 'creator' in mapping
                    else uuid.uuid4())

    create_time: datetime = (parser.isoparse(mapping['time'])
                             if 'time' in mapping
                             else datetime.now())

    title: str = mapping.get('title', '')

    tmp = FormDefine(title, creator, create_time)

    for f in mapping['form']:
        f: Dict
        t = f['type']
        k = f['key']
        ask = f['ask']
        require = f.get('require', True)
        limit = f.get('limit', None)

        form: BaseForm
        if t == 'int':
            form = IntForm(k, ask, require, limit)
        elif t == 'short_text':
            form = ShortTextForm(k, ask, require, limit)
        elif t == 'text':
            form = TextForm(k, ask, require, limit)
        elif t in ('choice', 'multi_choice'):
            cs = f.get('choices', None)
            if t == 'choice':
                form = SingleChoiceForm(k, ask, require, cs)
            else:
                form = MultiChoiceForm(k, ask, require, limit, cs)
        else:
            continue
        tmp.append_form(form)
    return tmp
