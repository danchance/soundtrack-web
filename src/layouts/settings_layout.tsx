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
  const { isAuthenticated } = useAuth0();

  /**
   * All Settings pages are only accessible to authenticated users, redirect
   * to home page if user is not authenticated.
   */
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  });

  return (
    <>
      <div className={styles['navigation']}>
        <ul>
          <li className={page === SettingsPage.ACCOUNT ? styles['active'] : ''}>
            <Link href="settings/account">ACCOUNT</Link>
          </li>
          <li className={page === SettingsPage.PROFILE ? styles['active'] : ''}>
            <Link href="settings/profile">PROFILE</Link>
          </li>
          <li className={page === SettingsPage.PRIVACY ? styles['active'] : ''}>
            <Link href="settings/privacy">PRIVACY</Link>
          </li>
          <li
            className={
              page === SettingsPage.CONNECTIONS ? styles['active'] : ''
            }
          >
            <Link href="settings/connections">CONNECTIONS</Link>
          </li>
        </ul>
      </div>
      <div className={styles['settings-wrapper']}>{children}</div>
    </>
  );
};

export default SettingsLayout;
