import SpotifyAuth from '@/components/spotify_auth';
import { useAuth0 } from '@auth0/auth0-react';
import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useEffect, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';

/**
 * User Privacy Settings page.
 * Options on this page are:
 *  - Link Spotify account.
 */
const Connections = () => {
  const [url, setUrl] = useState<string>('');
  const { user } = useAuth0();
  const { isLoading, error, data } = useFetch(url);

  useEffect(() => {
    if (!user) return;
    setUrl(`http://localhost:3000/api/users/${user.sub}/settings`);
  }, [user]);

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
      <h2>Connect to Spotify</h2>
      <p>
        Connect your Spotify account to start tracking your streaming history.
      </p>
      <SpotifyAuth />
    </div>
  );
};

Connections.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingsLayout page={SettingsPage.CONNECTIONS}>{page}</SettingsLayout>
  );
};

export default Connections;
