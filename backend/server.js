/**
 * We use the server to retrieve access and refresh tokens and server them back to the client
 * We use axios on the frontend to get to our routes/api on the backend
 */
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const redirectUri = 'http://localhost:3000';
const port = 3005;

app.post('/login', async (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    console.log(data.body);
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.post('/refresh', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken
  });

  try {
    data = await spotifyApi.refreshAccessToken();
    res.json({
      accessToken: data.body.accessToken,
      expiresIn: data.body.expiresIn
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.listen(port, () =>
  console.log(`HTTP Server up. Now go to ${port} in your browser.`)
);
