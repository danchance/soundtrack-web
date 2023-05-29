import { useAuth0 } from '@auth0/auth0-react';
import styles from '@/styles/components/navbar/navbar.module.sass';
import Link from 'next/link';
import Search from './search';
import UserMenu from './user_menu';
import useWindowSize from '@/hooks/useWindowSize';

/**
 * Main navigation bar component. Contains:
 *  - Site heading
 *  - Search bar
 *  - User login options/profile.
 * @param hasBackground - Determines whether the navbar has a background or not.
 */
const NavBar = ({ hasBackground }: { hasBackground: boolean }) => {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();
  const windowSize = useWindowSize();

  return (
    <div
      className={`${styles['wrapper']} ${hasBackground ? styles['bg'] : ''}`}
    >
      <div className={styles['navbar']}>
        <Link href="/" className={styles['site-heading']}>
          <h1>soundTrack</h1>
        </Link>
        {/* <Search /> */}
        {!isLoading && (
          <>
            {user && <UserMenu user={user} />}
            {!user && (
              <div className={styles['login-options']}>
                {windowSize.width > 800 && (
                  <button
                    className={`${styles['btn']} ${styles['btn-primary']}`}
                    onClick={() => loginWithRedirect()}
                  >
                    LOG IN
                  </button>
                )}
                <button
                  className={`${styles['btn']} ${styles['btn-secondary']}`}
                  onClick={() =>
                    loginWithRedirect({
                      authorizationParams: { screen_hint: 'signup' }
                    })
                  }
                >
                  SIGN UP
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
