import React from 'react'

const clientId: string = '192e51fc44214cf0b6b1499d53081333',
redirectUri: string = 'http://localhost:3000',
scopes: string[] = ['playlist-modify-public', 'playlist-modify-private'],
resType: string = 'code'

const scopesStr = scopes.join('%20')

const AUTH_URL: string =
  `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${resType}&redirect_uri=${redirectUri}&scope=${scopesStr}`


export const Login = () => {
  console.log(AUTH_URL)
  return (
    <button><a href='/auth'>Login</a></button>
  )
}
