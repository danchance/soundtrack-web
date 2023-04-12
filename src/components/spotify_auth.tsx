import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import Link from 'next/link';
import spotifyConfig from '@/config/spotify.config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 *
 * @param param0
 * @returns
 */
const SpotifyAuth = () => {
  const [code, setCode] = useState<string>(useRouter().query.code as string);
  const { getAccessTokenSilently } = useAuth0();

  /**
   *
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div>
      <Link href={spotifyConfig.loginUrl}>Connect with Spotify</Link>
    </div>
  );
};

export default SpotifyAuth;
