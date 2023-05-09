import SpotifyConnection from '@/components/settings/spotify_connection';
import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useEffect, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import useFetch from '@/hooks/useFetch';
import SpotifyLogo from '@/assets/icons/spotify_logo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

type SettingsResponse = {
  spotifyConnection: boolean;
};

/**
 * User Privacy Settings page.
 * Options on this page are:
 *  - Link Spotify account.
 */
const Connections = () => {
  const { error, data } = useFetch<SettingsResponse>(
    'http://localhost:8000/api/users/settings',
    true
  );
  const router = useRouter();
  const [spotifyConn, setSpotifyConn] = useState<boolean | null>(null);

  /**
   * Set the initial state of the settings to the current user settings.
   */
  useEffect(() => {
    if (!data) return;
    setSpotifyConn(data.spotifyConnection);
  }, [data]);

  /**
   * No specific error handling, redirect to 500 page if we were unable to
   * fetch the users settings.
   */
  if (error) {
    router.push('/500');
  }

  return (
    <div className={styles['container']}>
      <div className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Connections</h2>
        <div className={[styles['setting'], styles['connection']].join(' ')}>
          <SpotifyConnection
            connected={spotifyConn}
            setConnected={setSpotifyConn}
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
