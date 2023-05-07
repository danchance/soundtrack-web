import styles from '@/styles/components/user/track_history.module.sass';
import { formatDate } from '@/utils/format_date_time';
import Image from 'next/image';
import Link from 'next/link';
import { RecentlyPlayedTrack } from '@/utils/types';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '../loading_spinner';

type TrackHistoryProps = {
  username: string;
};

type RecentlyPlayedResponse = {
  recentTracks: RecentlyPlayedTrack[];
};

/**
 * Component for displaying a users recently played tracks.
 * @param itemList The list of tracks to display.
 */
const TrackHistory = ({ username }: TrackHistoryProps) => {
  const url = `http://localhost:8000/api/users/${username}/track-history`;
  const { data } = useFetch<RecentlyPlayedResponse>(url, true);

  if (!data)
    return (
      <div className={styles['container']}>
        <div className={styles['header']}>
          <h2>RECENTLY PLAYED</h2>
        </div>
        <LoadingSpinner size={2.5} weight={4} />
      </div>
    );

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h2>RECENTLY PLAYED</h2>
      </div>
      {data && (
        <table className={styles['list']}>
          <tbody>
            {data.recentTracks.map((item) => (
              <tr key={item.id}>
                <td className={styles['artwork-col']}>
                  <Link
                    href={`/library/${item.Track.Album.Artist.slug}/${item.Track.Album.slug}/${item.Track.slug}`}
                  >
                    <Image
                      className={styles['artwork']}
                      src={item.Track.Album.artwork}
                      alt={item.Track.name}
                      width={40}
                      height={40}
                    ></Image>
                  </Link>
                </td>
                <td className={styles['track-col']}>
                  <Link
                    href={`/library/${item.Track.Album.Artist.slug}/${item.Track.Album.slug}/${item.Track.slug}`}
                  >
                    {item.Track.name}
                  </Link>
                </td>
                <td className={styles['artist-col']}>
                  <Link href={`/library/${item.Track.Album.Artist.slug}`}>
                    {item.Track.Album.Artist.name}
                  </Link>
                </td>
                <td className={styles['time-col']}>
                  <p>{formatDate(item.playedAt)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles['footer']}>
        <Link href={`/user/${username}/tracks`}>View All</Link>
      </div>
    </div>
  );
};

export default TrackHistory;
