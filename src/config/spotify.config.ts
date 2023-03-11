const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';
const clientId = '251e80c7b65e4e1797a529c3e8572dbd';
const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read'
];
const queryParams = new URLSearchParams({
  response_type: 'code',
  client_id: clientId,
  scope: scopes.join(' '),
  redirect_uri: redirectUri,
  state: 'abcd'
});

const config = {
  redirectUri,
  loginUrl: `${authEndpoint}?` + queryParams.toString()
};

export default config;
