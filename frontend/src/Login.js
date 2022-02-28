import React from 'react';
import { Container } from 'react-bootstrap';

const clientId = process.env.REACT_APP_CLIENT_ID,
  resType = 'code',
  redirectUri = 'http://localhost:3000',
  scopes = ['playlist-modify-public', 'playlist-modify-private'];

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${resType}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}`;

export const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
};
