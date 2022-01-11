from sys import platform
import requests
import env
from flask import Flask, jsonify, abort, request, render_template


app = Flask(__name__)

profile_cache = {}

#  use to point to actual endpoint of TRN api
platform_key = {
  'ps4': 'psn',
  'xbox': 'xbl',
  'origin': 'origin'
}

@app.route('/profile', methods=['GET'])
def search_profile():
    '''
    search profile with given platform and userName
    supported platform: playstation, xbox, origin
    profile_cache to prevent too many api calls
    '''
    platform = request.args.get('platform')
    userName = request.args.get('user')
    if (platform, userName) in profile_cache:
      return profile_cache[(platform, userName)]

    if not platform or not userName:
        abort(400, "Bad Request: Not valid search")
    response = requests.get("https://public-api.tracker.gg/apex/v1/standard/profile/2/MullyF",\
       headers={'TRN-Api-Key':env.API_TOKEN})

    profile_cache[(platform,userName)] = response.content
    return response.content


@app.after_request
def after_request(response):
    """
    @https://github.com/corydolphin/flask-cors/issues/200
    To solve connection blocked by cors
    :param response:
    :return:
    """
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.run(debug=True)