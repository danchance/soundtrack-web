import { useAuth0 } from '@auth0/auth0-react';
import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import useAccessToken from '@/hooks/useAccessToken';
import { patch } from '@/utils/fetch_wrapper';
import DeleteAccount from '@/components/settings/delete_account';

type PatchSettingsError = {
  error: {
    status: number;
    error: [
      {
        type: string;
        value: string;
        msg: string;
        path: string;
        location: string;
      }
    ];
  };
};

type PatchSettingsResponse = {
  username: { status: 'success' | 'failure'; message: string };
  email: { status: 'success' | 'failure'; message: string };
  password: { status: 'success' | 'failure'; message: string };
};

/**
 * User Account Settings page.
 * Options on this page are:
 *  - Change Username
 *  - Change Email.
 *  - Change Password.
 *  - Delete Account.
 */
const Account = () => {
  const { user, getAccessTokenWithPopup } = useAuth0();
  const { accessToken } = useAccessToken();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  /**
   * Update the users settings on form submit.
   * @param e The form event.
   */
  const updateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    // Set empty values undefined as stringify ignores undefined values.
    const settings = JSON.stringify({
      username: username === '' ? undefined : username,
      email: email === '' ? undefined : email,
      password: password === '' ? undefined : password,
      confirmPassword: confirmPassword === '' ? undefined : confirmPassword
    });
    try {
      const res = await patch<PatchSettingsResponse>(
        `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/users/settings`,
        settings,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      // Clear field if it was updated successfully, else display the error
      // message.
      if (res.username) {
        if (res.username.status === 'success') {
          setUsername('');
        } else {
          setUsernameError(res.username.message);
        }
      }
      if (res.email) {
        if (res.email.status === 'success') {
          setEmail('');
        } else {
          setEmailError(res.email.message);
        }
      }
      if (res.password) {
        if (res.password.status === 'success') {
          setPassword('');
        } else {
          setPasswordError(res.password.message);
        }
      }
      // Refresh the access token.
      await getAccessTokenWithPopup({
        authorizationParams: {
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
        }
      });
    } catch (error) {
      const err = error as PatchSettingsError;
      console.log('error', err);
      if (err.error?.status === 400) {
        for (const error of err.error.error) {
          switch (error.path) {
            case 'username':
              setUsernameError(error.msg);
              break;
            case 'email':
              setEmailError(error.msg);
              break;
            case 'password':
              setPasswordError(error.msg);
              break;
          }
        }
      }
    }
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={updateSettings} className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Account Info</h2>
        <div className={[styles['setting'], styles['account-info']].join(' ')}>
          <h3 className={styles['setting-name']}>Change Username</h3>
          <div className={styles['setting-wrapper']}>
            <div>
              <p className={styles['label']}>Current:</p>
              <span className={styles['current-info']}>{user?.username}</span>
            </div>
            <div>
              <label htmlFor="username" className={styles['label']}>
                New Username:
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {usernameError && (
              <p className={styles['error']}>{usernameError}</p>
            )}
          </div>
        </div>
        <div className={[styles['setting'], styles['account-info']].join(' ')}>
          <h3 className={styles['setting-name']}>Update Email</h3>
          <div className={styles['setting-wrapper']}>
            <div>
              <p className={styles['label']}>Current:</p>
              <span className={styles['current-info']}>{user?.email}</span>
            </div>
            <div>
              <label htmlFor="email" className={styles['label']}>
                New Email:
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className={styles['error']}>{emailError}</p>}
          </div>
        </div>
        <div className={[styles['setting'], styles['account-info']].join(' ')}>
          <h3 className={styles['setting-name']}>Change Password</h3>
          <div className={styles['setting-wrapper']}>
            <div>
              <label htmlFor="password" className={styles['label']}>
                New Password:
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password2" className={styles['label']}>
                Confirm Password:
              </label>
              <input
                type="password"
                name="password2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <p className={styles['error']}>{passwordError}</p>
            )}
          </div>
        </div>
        <button type="submit" className={styles['submit-btn']}>
          Update Settings
        </button>
      </form>
      {user !== undefined && <DeleteAccount user={user} />}
    </div>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout page={SettingsPage.ACCOUNT}>{page}</SettingsLayout>;
};

export default Account;
