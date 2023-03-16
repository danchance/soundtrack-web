import styles from '@/styles/components/recently_played.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Track = {
  id: string;
  name: string;
  duration: number;
  artwork: string;
  artist: string;
};

type RecentlyPlayed = {
  track: Track;
  playedAt: Date;
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
  const [list, setList] = useState<Array<RecentlyPlayed>>([]);
  const [view, setView] = useState<View>(View.LIST);

  useEffect(() => {
    setList([
      {
        track: {
          id: '1',
          name: 'Track One',
          duration: 191,
          artwork:
            'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
          artist: 'Artist One'
        },
        playedAt: new Date()
      },
      {
        track: {
          id: '2',
          name: 'Track Two',
          duration: 191,
          artwork:
            'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
          artist: 'Artist One'
        },
        playedAt: new Date()
      },
      {
        track: {
          id: '3',
          name: 'Track Three',
          duration: 191,
          artwork:
            'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
          artist: 'Artist One'
        },
        playedAt: new Date()
      },
      {
        track: {
          id: '4',
          name: 'Track Four Four Four Four Four',
          duration: 191,
          artwork:
            'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
          artist: 'Artist One'
        },
        playedAt: new Date()
      },
      {
        track: {
          id: '5',
          name: 'Track Five',
          duration: 191,
          artwork:
            'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
          artist: 'Artist Two'
        },
        playedAt: new Date()
      }
    ]);
  }, []);

  return (
    <>
      <div className={styles['header']}>
        <h2>Recently Played</h2>
        <div className={styles['options']}>
          <button onClick={() => setView(View.GRID)}>Grid</button>
          <button onClick={() => setView(View.LIST)}>List</button>
        </div>
      </div>
      {view === View.GRID && (
        <div className={styles['grid']}>
          {list.map((recent, index) => (
            <div key={index} className={styles['track']}>
              <Link href="#">
                <Image
                  className={styles['artwork']}
                  src={recent.track.artwork}
                  alt={recent.track.name}
                  width={150}
                  height={150}
                ></Image>
              </Link>
              <div className={styles['info']}>
                <Link href="#" className={styles['track-name']}>
                  {recent.track.name}
                </Link>
                <Link href="#">{recent.track.artist}</Link>
                <p>{recent.playedAt.toDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {view === View.LIST && (
        <table className={styles['list']}>
          {list.map((recent, index) => (
            <tr key={index}>
              <td className={styles['artwork-col']}>
                <Link href="#">
                  <Image
                    className={styles['artwork']}
                    src={recent.track.artwork}
                    alt={recent.track.name}
                    width={50}
                    height={50}
                  ></Image>
                </Link>
              </td>
              <td className={styles['track-col']}>
                <Link href="#">{recent.track.name}</Link>
              </td>
              <td className={styles['artist-col']}>
                <Link href="#">{recent.track.artist}</Link>
              </td>
              <td className={styles['time-col']}>
                <p>{recent.playedAt.toDateString()}</p>
              </td>
            </tr>
          ))}
        </table>
      )}
      <div className={styles['footer']}>
        <button>View All</button>
      </div>
    </>
  );
};

export default RecentlyPlayed;
