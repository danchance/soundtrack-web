import useFetch from '@/hooks/useFetch';
import styles from '@/styles/components/recently_played.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LoadingSpinner from './loading_spinner';

type Track = {
  id: string;
  name: string;
  duration: number;
  artwork: string;
  artist: string;
};

type StreamedTrack = {
  track: Track;
  playedAt: string;
};

enum View {
  LIST = 0,
  GRID = 1
}

/**
 * Component for displaying a users recently played tracks.
 * @param user id of the user.
 */
const RecentlyPlayed = ({ user }: { user: string }) => {
  const { isLoading, error, data } = useFetch(
    `http://localhost:8000/api/users/${user}/history`
  );
  const [view, setView] = useState<View>(View.LIST);

  const header = (
    <div className={styles['header']}>
      <h2>Recently Played</h2>
      <div className={styles['options']}>
        <button onClick={() => setView(View.GRID)}>Grid</button>
        <button onClick={() => setView(View.LIST)}>List</button>
      </div>
    </div>
  );

  if (error) {
    return (
      <>
        {header}
        <div className={styles['error']}>
          Looks like something went wrong! :(
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {header}
        <LoadingSpinner height={5} />
      </>
    );
  }

  return (
    <>
      {header}
      {view === View.GRID && (
        <div className={styles['grid']}>
          {data.tracks.map((stream: StreamedTrack, index: number) => (
            <div key={index} className={styles['track']}>
              <Link href="#">
                <Image
                  className={styles['artwork']}
                  src={stream.track.artwork}
                  alt={stream.track.name}
                  width={150}
                  height={150}
                ></Image>
              </Link>
              <div className={styles['info']}>
                <Link href="#" className={styles['track-name']}>
                  {stream.track.name}
                </Link>
                <Link href="#">{stream.track.artist}</Link>
                {/* <p>{stream.playedAt.toDateString()}</p> */}
                <p>{stream.playedAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {view === View.LIST && (
        <table className={styles['list']}>
          <tbody>
            {data.tracks.map((stream: any, index: number) => (
              <tr key={index}>
                <td className={styles['artwork-col']}>
                  <Link href="#">
                    <Image
                      className={styles['artwork']}
                      src={stream.track.artwork}
                      alt={stream.track.name}
                      width={50}
                      height={50}
                    ></Image>
                  </Link>
                </td>
                <td className={styles['track-col']}>
                  <Link href="#">{stream.track.name}</Link>
                </td>
                <td className={styles['artist-col']}>
                  <Link href="#">{stream.track.artist}</Link>
                </td>
                <td className={styles['time-col']}>
                  {/* <p>{stream.playedAt.toDateString()}</p> */}
                  <p>{stream.playedAt}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles['footer']}>
        <button>View All</button>
      </div>
    </>
  );
};

export default RecentlyPlayed;
