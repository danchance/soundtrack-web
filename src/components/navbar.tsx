import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import styles from '@/styles/components/navbar.module.sass';
import { useEffect } from 'react';

const NavBar = ({}) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const getTrack = async () => {
    const data = await fetch('http://localhost:8000/api/tracks/123');

    console.log(await data.json());
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={styles['container']}>
      {isAuthenticated && (
        <div>
          {user!.picture && (
            <Image src={user!.picture} alt="" width="50" height="50"></Image>
          )}

          <h2>{user!.username}</h2>
          <p>{user!.email}</p>
          <button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL
                }
              })
            }
          >
            Log Out
          </button>
          <button onClick={getTrack}>Get Track</button>
        </div>
      )}
      {!user && (
        <div>
          <button onClick={() => loginWithRedirect()}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
