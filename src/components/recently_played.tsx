import useFetch from '@/hooks/useFetch';
import styles from '@/styles/components/recently_played.module.sass';
import formatDate from '@/utils/format_date';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingSpinner from './loading_spinner';

type Artist = {
  id: string;
  name: string;
  image: string;
};

type Album = {
  id: string;
  name: string;
  artwork: string;
  releaseYear: number;
  trackNum: number;
  type: string;
  Artist: Artist;
};

type Track = {
  id: string;
  name: string;
  duration: number;
  Album: Album;
};

type RecentlyPlayed = {
  tracks: Array<StreamedTrack>;
};

type StreamedTrack = {
  id: number;
  Track: Track;
  playedAt: string;
};

enum View {
  LIST = 0,
  GRID = 1
}

/**
 * Component for displaying a users recently played tracks.
 * @param user The username of the user to display.
 */
const RecentlyPlayed = ({ user }: { user: string }) => {
  const { isLoading, error, data } = useFetch<RecentlyPlayed>(
    `http://localhost:8000/api/users/${user}/history`
  );
  const [tracks, setTracks] = useState<StreamedTrack[]>([]);
  const [view, setView] = useState<View>(View.LIST);

  useEffect(() => {
    if (!data || !data.tracks) return;
    setTracks(data.tracks);
  }, [data]);

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
          <p>Looks like something went wrong! :(</p>
          <button>Try again</button>
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
          {tracks.map((stream: StreamedTrack) => (
            <div key={stream.id} className={styles['track']}>
              <Link href="#">
                <Image
                  className={styles['artwork']}
                  src={stream.Track.Album.artwork}
                  alt={stream.Track.name}
                  width={150}
                  height={150}
                ></Image>
              </Link>
              <div className={styles['info']}>
                <Link href="#" className={styles['track-name']}>
                  {stream.Track.name}
                </Link>
                <Link href="#">{stream.Track.Album.Artist.name}</Link>
                <p className={styles['time']}>{formatDate(stream.playedAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {view === View.LIST && (
        <table className={styles['list']}>
          <tbody>
            {tracks.map((stream: StreamedTrack) => (
              <tr key={stream.id}>
                <td className={styles['artwork-col']}>
                  <Link href="#">
                    <Image
                      className={styles['artwork']}
                      src={stream.Track.Album.artwork}
                      alt={stream.Track.name}
                      width={40}
                      height={40}
                    ></Image>
                  </Link>
                </td>
                <td className={styles['track-col']}>
                  <Link href="#">{stream.Track.name}</Link>
                </td>
                <td className={styles['artist-col']}>
                  <Link href="#">{stream.Track.Album.Artist.name}</Link>
                </td>
                <td className={styles['time-col']}>
                  <p>{formatDate(stream.playedAt)}</p>
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
