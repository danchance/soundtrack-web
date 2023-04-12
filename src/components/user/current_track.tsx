import useFetch from '@/hooks/useFetch';
import styles from '@/styles/components/user/current_track.module.sass';
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
 * If the user is not playing a track, the last track they played is
 * displayed.
 * Checks if the track is still playing every 15 seconds.
 * @param user The user to display the current track for.
 */
const CurrentTrack = ({ userid }: { userid: string }) => {
  const url = `http://localhost:8000/api/users/${userid}/current-track`;
  const { data, request } = useFetch<{ track: CurrentTrack }>(url);

  /**
   * Check the current track every 15 seconds.
   */
  useEffect(() => {
    const interval = setInterval(() => request(), 15000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['container']}>
      {data?.track && <Image src={data.track.artwork} alt="" fill></Image>}
    </div>
  );
};

export default CurrentTrack;
