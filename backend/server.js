const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const app = express();

const redirectUri = 'http://localhost:3000/callback';

app.get('/auth', (req, res) => {
  spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  scopes = ['playlist-modify-public', 'playlist-modify-private'];
  res.redirect(spotifyApi.createAuthorizeURL(scopes)); // goes to /callback
});
