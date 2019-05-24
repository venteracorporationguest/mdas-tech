from sanic import Sanic
from sanic_cors import CORS
from celery import Celery

from controllers import (user, home)

tasks = Celery('afml', broker='pyamqp://guest@localhost//')
tasks.autodiscover_tasks(['models.mongo'])

app = Sanic()
CORS(app)

PREFIX = '/api'

app.add_route(home.home, '/',    methods=['GET'])

# user
app.add_route(user.register, user.prefix(PREFIX) +  '/register',    methods=['OPTIONS', 'POST'])
app.add_route(user.login, user.prefix(PREFIX) +     '/login',       methods=['OPTIONS', 'POST'])
