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

const RecentlyPlayed = () => {
  const [trackList, setTrackList] = useState<Array<Track>>([]);

  useEffect(() => {
    setTrackList([
      {
        id: '1',
        name: 'Track One',
        duration: 191,
        artwork:
          'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: 'Artist One'
      },
      {
        id: '2',
        name: 'Track Two',
        duration: 191,
        artwork:
          'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: 'Artist One'
      },
      {
        id: '3',
        name: 'Track Three sdafhdasfj  a;dfja fajfkljdsflsdj  sjdflsdjfsdljslfjs  sljfsdlf ',
        duration: 191,
        artwork:
          'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: 'Artist One'
      },
      {
        id: '4',
        name: 'Track Four',
        duration: 191,
        artwork:
          'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: 'Artist One'
      },
      {
        id: '5',
        name: 'Track Five',
        duration: 191,
        artwork:
          'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: 'Artist One'
      },
      {
        id: '6',
        name: 'Track Six',
        duration: 191,
        artwork:
          'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: 'Artist One'
      }
    ]);
  }, []);

  return (
    <>
      <div className={styles['header']}>
        <h2>Recently Played</h2>
        <div className={styles['options']}>
          <button>Timeline</button>
          <button>List</button>
        </div>
      </div>
      <div>
        <table className={styles['track-table']}>
          {trackList.map((track, index) => (
            <tr key={index}>
              <td className={styles['artwork-col']}>
                <Link href="#">
                  <Image
                    className={styles['artwork']}
                    src={track.artwork}
                    alt={track.name}
                    width={50}
                    height={50}
                  ></Image>
                </Link>
              </td>
              <td className={styles['track-col']}>
                <Link href="#">{track.name}</Link>
              </td>
              <td className={styles['artist-col']}>
                <Link href="#">{track.artist}</Link>
              </td>
              <td className={styles['time-col']}>
                <p>{track.duration} seconds</p>
              </td>
            </tr>
          ))}
        </table>
        <div className={styles['footer']}>
          <button>More</button>
        </div>
      </div>
    </>
  );
};

export default RecentlyPlayed;
