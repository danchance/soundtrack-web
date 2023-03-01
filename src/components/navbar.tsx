import { useAuth0 } from '@auth0/auth0-react';

const NavBar = ({}) => {
  const { user, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
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
