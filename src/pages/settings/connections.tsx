import SpotifyConnection from '@/components/settings/spotify_connection';
import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useEffect, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import useFetch from '@/hooks/useFetch';
import SpotifyLogo from '@/assets/icons/spotify_logo.png';
import Image from 'next/image';

type SettingsResponse = {
  spotifyConnection: boolean;
};

/**
 * User Privacy Settings page.
 * Options on this page are:
 *  - Link Spotify account.
 */
const Connections = () => {
  const { isLoading, error, data } = useFetch<SettingsResponse>(
    'http://localhost:8000/api/users/settings',
    true
  );
  const [spotifyConnection, setSpotifyConnection] = useState<boolean | null>(
    null
  );

  /**
   * Set the initial state of the settings to the current user settings.
   */
  useEffect(() => {
    if (!data) return;
    setSpotifyConnection(data.spotifyConnection);
  }, [data]);

  if (error) {
    return (
      <div>
        {error.status} {error.message}
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <div className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Connections</h2>
        <div className={[styles['setting'], styles['connection']].join(' ')}>
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
          <div>
            <SpotifyConnection
              connected={spotifyConnection}
              setConnected={setSpotifyConnection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Connections.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingsLayout page={SettingsPage.CONNECTIONS}>{page}</SettingsLayout>
  );
};

export default Connections;
