import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import Link from 'next/link';
import spotifyConfig from '@/config/spotify.config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Component for connecting with a users Spotify account.
 */
const SpotifyConnection = () => {
  const code = useRouter().query.code as string;
  const { getAccessTokenSilently } = useAuth0();

  /**
   * When the user is redirected back to the app from Spotify, the code is passed
   * as a query parameter. This code is then used to get an access token for the
   * for the user.
   */
  useEffect(() => {
    if (typeof code === 'undefined') return;
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
          }
        });
        const data = await fetch(
          'http://localhost:8000/api/users/spotify/auth',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              code: code,
              redirectUri: spotifyConfig.redirectUri
            })
          }
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [code, getAccessTokenSilently]);

  return (
    <div>
      <Link href={spotifyConfig.loginUrl}>Connect</Link>
    </div>
  );
};

export default SpotifyConnection;
