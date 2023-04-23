import { useAuth0 } from '@auth0/auth0-react';
import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import LoadingSpinner from '@/components/loading_spinner';
import useAccessToken from '@/hooks/useAccessToken';
import { _delete, patch } from '@/utils/fetch_wrapper';

/**
 * User Account Settings page.
 * Options on this page are:
 *  - Change Username
 *  - Change Email.
 *  - Change Password.
 *  - Delete Account.
 */
const Account = () => {
  const { isLoading, error, user, getAccessTokenWithPopup } = useAuth0();
  const { accessToken } = useAccessToken();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  /**
   * Update the users settings on form submit.
   * @param e
   */
  const updateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Set empty values undefined as stringify ignores undefined values.
    const settings = JSON.stringify({
      username: username === '' ? undefined : username,
      email: email === '' ? undefined : email,
      password: password === '' ? undefined : password,
      confirmPassword: confirmPassword === '' ? undefined : confirmPassword
    });
    try {
      const res = await patch(
        `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/users/settings`,
        settings,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      // Settings updated successfully, refresh the access token and clear the fields.
      await getAccessTokenWithPopup({
        authorizationParams: {
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
        }
      });
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete user account.
   */
  const deleteAccount = async () => {
    try {
      await _delete(`http://localhost:8000/api/users/${user!.sub}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      });
      // Redirect to home page.
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner height={5} />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['container']}>
      <form onSubmit={updateSettings} className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Account Info</h2>
        <div className={styles['setting']}>
          <h3 className={styles['setting-heading']}>Change Username</h3>
          <p>Current: {user?.username}</p>
          <label htmlFor="username">New Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles['setting']}>
          <h3 className={styles['setting-heading']}>Update Email</h3>
          <p>Current: {user?.email}</p>
          <label htmlFor="email">New Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles['setting']}>
          <h3 className={styles['setting-heading']}>Change Password</h3>
          <label htmlFor="password">Old Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password2">New Password</label>
          <input
            type="password"
            name="password2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Settings</button>
      </form>
      <div className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Account Actions</h2>
        <div className={styles['setting']}>
          <h3>Delete Account</h3>
          <p>
            Once you delete your account, your profile and username are
            permanently removed from soundTrack, and your listening history is
            deleted.
          </p>
          <p>This action is not reversible</p>
          <button onClick={deleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout page={SettingsPage.ACCOUNT}>{page}</SettingsLayout>;
};

export default Account;
