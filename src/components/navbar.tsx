import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import styles from '@/styles/components/navbar.module.sass';
import Link from 'next/link';
import Search from './navbar/search';
import UserMenu from './navbar/user_menu';

/**
 * Main navigation bar component. Contains:
 *  - Site heading
 *  - Search bar
 *  - User login options/profile.
 */
const NavBar = ({}) => {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  return (
    <div className={styles['navbar']}>
      <Link href="/" className={styles['site-heading']}>
        <h1>soundTrack</h1>
      </Link>
      <Search />
      {!isLoading && (
        <>
          {user && <UserMenu user={user} />}
          {!user && (
            <div>
              <button
                className={`${styles['btn']} ${styles['btn-primary']}`}
                onClick={() => loginWithRedirect()}
              >
                LOG IN
              </button>
              <button
                className={`${styles['btn']} ${styles['btn-secondary']}`}
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: { screen_hint: 'signup' }
                  })
                }
              >
                CREATE ACCOUNT
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NavBar;
