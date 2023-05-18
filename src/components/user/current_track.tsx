import useAccessToken from '@/hooks/useAccessToken';
import useFetch from '@/hooks/useFetch';
import styles from '@/styles/components/user/current_track.module.sass';
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import { useEffect } from 'react';

type CurrentTrack = {
  name: string;
  progress: number;
  duration: number;
  artwork: string;
  playingNow: boolean;
} | null;

/**
 * Component for displaying the track the user is currently playing.
 * Checks if the track is still playing every 15 seconds.
 * @param user The user to display the current track for.
 */
const CurrentTrack = ({ userid }: { userid: string }) => {
  const url = `http://localhost:8000/api/users/${userid}/current-track`;
  const { data, error, request } = useFetch<CurrentTrack>(url);
  const { isAuthenticated } = useAuth0();
  const { accessToken } = useAccessToken();

  /**
   * Check the current track every 15 seconds.
   */
  useEffect(() => {
    if (isAuthenticated && !accessToken) return;
    const interval = setInterval(() => request(accessToken), 15000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, accessToken]);

  if (!data || !data.playingNow || error) return <></>;

  return (
    <div className={styles['container']}>
      <div className={styles['track']}>
        <Image src={data.artwork} alt="" fill></Image>
      </div>
      <div className={styles['info']}>
        <h2 className={styles['heading']}>CURRENT STREAM</h2>
        <h3 className={styles['track-name']}>{data.name}</h3>
      </div>
    </div>
  );
};

export default CurrentTrack;
