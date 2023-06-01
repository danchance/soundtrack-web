const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read'
];
const queryParams = new URLSearchParams({
  response_type: 'code',
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
  scope: scopes.join(' '),
  redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL!
});

const config = {
  redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL!,
  loginUrl:
    `${process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL}?` + queryParams.toString()
};

export default config;
