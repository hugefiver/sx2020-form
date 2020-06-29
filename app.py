from flask import render_template

from config import PORT, HOST, DEBUG
from init import app


@app.errorhandler(404)
def handle_404(error):
    return render_template('/error.html',
                           error_code=404,
                           error_msg='Page Not Found',
                           data={'error': error})


@app.route('/')
def index():
    return 'hello'


def main():
    app.run(host=HOST, port=PORT, debug=DEBUG)


if __name__ == '__main__':
    main()
