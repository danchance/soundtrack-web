import Link from 'next/link';
import spotifyConfig from '@/config/spotify.config';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAccessToken from '@/hooks/useAccessToken';
import { _delete, post } from '@/utils/fetch_wrapper';
import LoadingSpinner from '../loading_spinner';

type SpotifyConnectionProps = {
  connected: boolean | null;
  setConnected: Dispatch<SetStateAction<boolean | null>>;
};

/**
 * Component for connecting with a users Spotify account.
 * @param connected - Whether the user is already connected to Spotify.
 */
const SpotifyConnection = ({
  connected,
  setConnected
}: SpotifyConnectionProps) => {
  const code = useRouter().query.code as string;
  const { accessToken } = useAccessToken();

  /**
   * When the user is redirected back to the app from Spotify, the code is passed
   * as a query parameter. This code is then used to get an access token for the
   * for the user.
   */
  useEffect(() => {
    if (typeof code === 'undefined' || !accessToken) return;
    (async () => {
      try {
        await post(
          'http://localhost:8000/api/users/spotify',
          JSON.stringify({
            code: code,
            redirectUri: spotifyConfig.redirectUri
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setConnected(true);
      } catch (error) {
        console.log(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, accessToken]);

  /**
   * Disconnect the user from Spotify.
   */
  const disconnect = async () => {
    try {
      setConnected(null);
      await _delete('http://localhost:8000/api/users/spotify', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setTimeout(() => setConnected(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Loading status of the connection. Display loading button.
   */
  if (connected === null) {
    return (
      <button onClick={disconnect}>
        <LoadingSpinner size={1} weight={2} />
      </button>
    );
  }

  /**
   * User is already connected to Spotify. Display a button to disconnect.
   */
  if (connected) {
    return <button onClick={disconnect}>Connected</button>;
  }

  /**
   * User is not connected to Spotify. Display a link to connect.
   */
  return <Link href={spotifyConfig.loginUrl}>Connect</Link>;
};

export default SpotifyConnection;
