import styles from '@/styles/layouts/settings_layout.module.sass';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type SettingsLayoutProps = {
  children: React.ReactNode;
  page: SettingsPage;
};

/**
 * Define all items in the settings navigation list.
 */
export enum SettingsPage {
  ACCOUNT = 'Account',
  PROFILE = 'Profile',
  PRIVACY = 'Privacy',
  CONNECTIONS = 'Connections'
}

/**
 * Layout used on all user settings pages.
 * @param page The current active page.
 */
const SettingsLayout = ({ children, page }: SettingsLayoutProps) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth0();

  /**
   * All Settings pages are only accessible to authenticated users, redirect
   * to home page if user is not authenticated.
   */
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <div className={styles['nav-background']}></div>
      <div className={styles['container']}>
        <nav className={styles['nav']}>
          <h1 className={styles['heading']}>Settings</h1>
          <ul>
            <li
              className={[
                styles['nav-item'],
                page === SettingsPage.ACCOUNT ? styles['active'] : ''
              ].join(' ')}
            >
              <Link href="/settings/account">Account</Link>
            </li>
            <li
              className={[
                styles['nav-item'],
                page === SettingsPage.PROFILE ? styles['active'] : ''
              ].join(' ')}
            >
              <Link href="/settings/profile">Profile</Link>
            </li>
            <li
              className={[
                styles['nav-item'],
                page === SettingsPage.PRIVACY ? styles['active'] : ''
              ].join(' ')}
            >
              <Link href="/settings/privacy">Privacy</Link>
            </li>
            <li
              className={[
                styles['nav-item'],
                page === SettingsPage.CONNECTIONS ? styles['active'] : ''
              ].join(' ')}
            >
              <Link href="/settings/connections">Connections</Link>
            </li>
          </ul>
        </nav>
        <div></div>
        <div className={styles['settings-wrapper']}>{children}</div>
      </div>
    </>
  );
};

export default SettingsLayout;
