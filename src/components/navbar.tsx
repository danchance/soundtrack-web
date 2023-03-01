import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';

const NavBar = ({}) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <div>
          {user!.picture && (
            <Image src={user!.picture} alt="" width="50" height="50"></Image>
          )}

          <h2>{user!.name}</h2>
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
