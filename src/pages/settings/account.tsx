import { useAuth0 } from '@auth0/auth0-react';
import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useEffect, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/loading_spinner';

/**
 * User Account Settings page.
 * Options on this page are:
 *  - Change Email.
 *  - Change Password.
 *  - Delete Account.
 */
const Account = () => {
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
      <h2>Email</h2>
      <h2>Password</h2>
      <h2>Delete Account</h2>
    </div>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout page={SettingsPage.ACCOUNT}>{page}</SettingsLayout>;
};

export default Account;
