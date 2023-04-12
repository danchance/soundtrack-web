import SpotifyAuth from '@/components/spotify_auth';
import { useAuth0 } from '@auth0/auth0-react';
import styles from '@/styles/pages/settings.module.sass';
import { ReactElement } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';

/**
 * User Privacy Settings page.
 */
const Privacy = () => {
  const { user } = useAuth0();

  return (
    <div className={styles['container']}>
      <SpotifyAuth />
    </div>
  );
};

Privacy.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout page={SettingsPage.PRIVACY}>{page}</SettingsLayout>;
};

export default Privacy;
