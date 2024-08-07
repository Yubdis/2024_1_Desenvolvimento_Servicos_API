require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/auth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  );
});

app.get('/oauth-callback', ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };

  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      // Fetch user information
      return axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${token}` },
      });
    })
    .then((response) => {
      const username = response.data.login; // Get the username from the response
      console.log('Username:', username);
      res.redirect(`/?username=${username}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

app.listen(3000);
console.log('App listening on port 3000');
