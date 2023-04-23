import SpotifyConnection from '@/components/spotify_connection';
import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useEffect, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';

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
  const [spotifyConnection, setSpotifyConnection] = useState<boolean>(false);

  /**
   * Set the initial state of the settings to the current user settings.
   */
  useEffect(() => {
    if (!data) return;
    setSpotifyConnection(data.spotifyConnection);
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner height={5} />
      </div>
    );
  }

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
        <div className={'setting'}>
          <h3 className={styles['setting-heading']}>Connect to Spotify</h3>
          <p>Link your Spotify account to start tracking.</p>
          <SpotifyConnection
            connected={spotifyConnection}
            setConnected={setSpotifyConnection}
          />
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
