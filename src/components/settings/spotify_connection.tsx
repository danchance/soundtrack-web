import Link from 'next/link';
import spotifyConfig from '@/config/spotify.config';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAccessToken from '@/hooks/useAccessToken';
import { _delete, post } from '@/utils/fetch_wrapper';
import LoadingSpinner from '../loading_spinner';
import styles from '@/styles/components/settings/connection.module.sass';
import Image from 'next/image';
import SpotifyLogo from '@/assets/icons/spotify_logo.png';

type SpotifyConnectionProps = {
  connected: boolean | null;
  setConnected: Dispatch<SetStateAction<boolean | null>>;
};

/**
 * Component for connecting with a users Spotify account.
 * @param connected Current connection status.
 * @param setConnected Function to set the connection status.
 */
const SpotifyConnection = ({
  connected,
  setConnected
}: SpotifyConnectionProps) => {
  const [error, setError] = useState<boolean>(false);
  const code = useRouter().query.code as string;
  const { accessToken } = useAccessToken();
  const router = useRouter();

  /**
   * When the user is redirected back to the app from Spotify, the code is passed
   * as a query parameter. This code is then used to get an access token for the
   * for the user.
   */
  useEffect(() => {
    if (typeof code === 'undefined' || !accessToken) return;
    (async () => {
      try {
        const res = await post(
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
        setError(false);
      } catch (error) {
        setError(true);
      }
      // Clear query params from url.
      router.replace('/settings/connections', undefined, { shallow: true });
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
      setTimeout(() => setConnected(false), 500);
      setError(false);
    } catch (error) {
      setConnected(true);
      setError(true);
    }
  };

  /**
   * The wrapper for displaying the connection status.
   * @param children Link/Button to connect/disconnect.
   */
  const connectionWrapper = (children: JSX.Element) => {
    return (
      <>
        <div className={styles['container']}>
          <div className={styles['connection']}>
            <div className={styles['info']}>
              <Image
                src={SpotifyLogo}
                alt="Spotify"
                width={50}
                height={50}
              ></Image>
              <div>
                <h3 className={styles['connection-name']}>Spotify</h3>
                <p className={styles['connection-text']}>
                  Link your Spotify account to start tracking.
                </p>
              </div>
            </div>
            <div>{children}</div>
          </div>
          {error && (
            <div className={styles['error']}>
              <div className={styles['filler']}></div>
              <p className={styles['message']}>
                Something went wrong, try connecting with Spotify again.
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  /**
   * Loading status of the connection. Display loading button.
   */
  if (connected === null) {
    return connectionWrapper(
      <button>
        <LoadingSpinner size={1} weight={2} />
      </button>
    );
  }

  /**
   * User is already connected to Spotify. Display a button to disconnect.
   */
  if (connected) {
    return connectionWrapper(<button onClick={disconnect}>Connected</button>);
  }

  /**
   * User is not connected to Spotify. Display a link to connect.
   */
  return connectionWrapper(<Link href={spotifyConfig.loginUrl}>Connect</Link>);
};

export default SpotifyConnection;
