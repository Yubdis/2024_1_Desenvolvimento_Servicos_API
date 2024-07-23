# python -m venv venv
# source venv/bin/activate  # On Windows, use venv\Scripts\activate
# pip install Flask requests requests-oauthlib

from flask import Flask, redirect, url_for, session, request
from requests_oauthlib import OAuth2Session
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# GitHub application information
client_id = "YOUR_CLIENT_ID"
client_secret = "YOUR_CLIENT_SECRET"
authorization_base_url = "https://github.com/login/oauth/authorize"
token_url = "https://github.com/login/oauth/access_token"
user_info_url = "https://api.github.com/user"


@app.route("/")
def home():
    return 'Welcome! <a href="/login">Click here to log in with GitHub</a>'


@app.route("/login")
def login():
    github = OAuth2Session(client_id)
    authorization_url, state = github.authorization_url(authorization_base_url)
    session["oauth_state"] = state
    return redirect(authorization_url)


@app.route("/callback")
def callback():
    github = OAuth2Session(client_id, state=session["oauth_state"])
    token = github.fetch_token(
        token_url, client_secret=client_secret, authorization_response=request.url
    )
    session["oauth_token"] = token

    return redirect(url_for(".profile"))


@app.route("/profile")
def profile():
    github = OAuth2Session(client_id, token=session["oauth_token"])
    user_info = github.get(user_info_url).json()

    return f"User's name: {user_info['name']}"


if __name__ == "__main__":
    app.run(debug=True)
