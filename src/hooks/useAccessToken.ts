import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

/**
 * Custom hook used to fetch the access token for the user.
 * @returns The access token for the user.
 */
const useAccessToken = (): { accessToken: string } => {
  const [accessToken, setAccessToken] = useState<string>('');
  const { user, getAccessTokenSilently } = useAuth0();

  /**
   * Fetch the access token for the user.
   */
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
          }
        });
        setAccessToken(token);
      } catch (error) {
        setAccessToken('');
      }
    })();
  }, [user, getAccessTokenSilently]);

  return { accessToken };
};

export default useAccessToken;
