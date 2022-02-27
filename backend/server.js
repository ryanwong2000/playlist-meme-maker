const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const redirectUri = 'http://localhost:3000/callback';
const port = process.env.PORT || 3005;

app.post('/login', (req, res) => {
  const code = req.body.code;

  spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  scopes = ['playlist-modify-public', 'playlist-modify-private'];

  spotifyApi
    .authorizeCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body['access_token'],
        refreshToken: data.body['refresh_token'],
        expiresIn: data.body['expires_in']
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.listen(port);
