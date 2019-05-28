from sanic.response import json, text

import datetime

from models.json_response import JSONResponse
from models.validator import Validator

from models.mongo.user import User

def prefix(pre):
    return pre + '/companies'

async def categories(request):
    if request.method == 'GET':
        validator = Validator()
        validator.hasRequiredFields('page', request.json)

        if not validator.hasErrors():
            categories = [
              {
                "name": "Technology",
                "value": 28
              },
              {
                "name": "Consumer Staples",
                "value": 14
              },
              {
                "name": "Consumer Discretionary",
                "value": 25
              },
              {
                "name": "Health Care",
                "value": 11
              },
              {
                "name": "Aerospace",
                "value": 22
              }
            ]
        return json(JSONResponse(success =  False if validator.hasErrors() else True,
                                 data    =  None if validator.hasErrors() else {'categories':categories},
                                 message =  'Error Saving User' if validator.hasErrors() else 'Successfully Saved User',
                                 errors  =  validator.errors if validator.hasErrors() else None).dict())

    else:
        return text('',status=200)
