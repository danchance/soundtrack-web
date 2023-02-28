import { useUser } from '@auth0/nextjs-auth0/client';

const NavBar = ({}) => {
  const { user, error, isLoading } = useUser();

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <a href="/api/auth/logout">Sign Out</a>
        </div>
      )}
      {!user && (
        <div>
          <a href="/api/auth/login">Log In</a>
        </div>
      )}
    </div>
  );
};

export default NavBar;
