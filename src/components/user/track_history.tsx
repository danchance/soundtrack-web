import styles from '@/styles/components/user/track_history.module.sass';
import { formatDate } from '@/utils/format_date_time';
import Image from 'next/image';
import Link from 'next/link';
import { RecentlyPlayedTrack } from '@/utils/types';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '../loading_spinner';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useWindowSize from '@/hooks/useWindowSize';

type TrackHistoryProps = {
  username: string;
};

type RecentlyPlayedResponse = {
  spotifyError: boolean;
  recentTracks: RecentlyPlayedTrack[];
};

/**
 * Component for displaying a users recently played tracks.
 * @param itemList The list of tracks to display.
 */
const TrackHistory = ({ username }: TrackHistoryProps) => {
  const url = `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/users/${username}/track-history`;
  const { data, error } = useFetch<RecentlyPlayedResponse>(url, true);
  const router = useRouter();
  const { isLoading, user } = useAuth0();
  const { width } = useWindowSize();

  if (error) {
    router.push('/500');
  }

  if (!data) {
    return (
      <div className={styles['container']}>
        <div className={styles['header']}>
          <h2>RECENTLY PLAYED</h2>
        </div>
        <LoadingSpinner size={2.5} weight={4} />
      </div>
    );
  }

  /**
   * Return streaming data.
   * If the user profile belongs to the logged in user and they need to
   * reconnect their Spotify account, display a message.
   */
  return (
    <>
      {!isLoading && data.spotifyError && username === user?.username && (
        <div className={[styles['container'], styles['auth-error']].join(' ')}>
          <h2>Your streaming data may be out of date.</h2>
          <h3>Reconnect your Spotify account to continue tracking.</h3>
          <Link
            href="/settings/connections"
            className={styles['reconnect-btn']}
          >
            Connect with Spotify
          </Link>
        </div>
      )}
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
                  {width < 500 && (
                    <td className={styles['info-col']}>
                      <Link
                        href={`/library/${item.Track.Album.Artist.slug}/${item.Track.Album.slug}/${item.Track.slug}`}
                      >
                        {item.Track.name}
                      </Link>
                      <Link href={`/library/${item.Track.Album.Artist.slug}`}>
                        {item.Track.Album.Artist.name}
                      </Link>
                    </td>
                  )}
                  {width >= 500 && (
                    <>
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
                    </>
                  )}
                  <td className={styles['time-col']}>
                    <p>{formatDate(item.playedAt)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* <div className={styles['footer']}>
          <Link href={`/user/${username}/tracks`}>View All</Link>
        </div> */}
      </div>
    </>
  );
};

export default TrackHistory;
