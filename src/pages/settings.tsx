import SpotifyAuth from '@/components/spotify_auth';
import { useAuth0 } from '@auth0/auth0-react';

const Settings = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <h1>Settings</h1>
      {isAuthenticated && <SpotifyAuth />}
    </div>
  );
};

export default Settings;
