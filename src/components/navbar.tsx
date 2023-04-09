import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import styles from '@/styles/components/navbar.module.sass';
import Link from 'next/link';
import SearchIcon from '@/assets/icons/search.png';
import { useRef } from 'react';
import useWindowSize from '@/hooks/useWindowSize';

const NavBar = ({}) => {
  const search = useRef<HTMLInputElement>(null);
  const windowSize = useWindowSize();
  const { isLoading, user, isAuthenticated, loginWithRedirect, logout } =
    useAuth0();

  const handleSearch = () => {};

  return (
    <div className={styles['navbar']}>
      <Link href="/" className={styles['site-heading']}>
        <h1>soundTrack</h1>
      </Link>
      <div
        className={`${styles['search-container']} ${
          windowSize.width < 600 ? styles['btn-only'] : ''
        }`}
      >
        {windowSize.width < 600 && (
          <button className={styles['search-btn']}>
            <Image src={SearchIcon} alt="search" width="20" height="20"></Image>
          </button>
        )}
        {windowSize.width >= 600 && (
          <form onSubmit={handleSearch}>
            <input
              ref={search}
              type="text"
              placeholder="Search..."
              className={styles['search-input']}
            />
            <button className={styles['search-btn']}>
              <Image
                src={SearchIcon}
                alt="search"
                width="20"
                height="20"
              ></Image>
            </button>
          </form>
        )}
      </div>
      {!isLoading && (
        <>
          {user && (
            <div>
              <button className={styles['user-profile']}>
                <Image
                  src={user.picture!}
                  alt="user profile"
                  width="45"
                  height="45"
                  className={styles['user-profile-img']}
                ></Image>
              </button>

              {/* <h2>{user!.username}</h2>
            <p>{user!.email}</p> */}
              {/* <button
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL
                  }
                })
              }
            >
              Log Out
            </button> */}
            </div>
          )}
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
