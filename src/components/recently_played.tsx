import styles from '@/styles/components/recently_played.module.sass';
import formatDate from '@/utils/format_date';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import GridSVG from '@/assets/icons/grid.svg';
import ListSVG from '@/assets/icons/list.svg';
import { RecentlyPlayedTrack } from '@/utils/types';

type RecentlyPlayedProps = {
  trackList: RecentlyPlayedTrack[];
};

enum View {
  LIST = 0,
  GRID = 1
}

/**
 * Component for displaying a users recently played tracks.
 * @param trackList The list of tracks to display.
 */
const RecentlyPlayed = ({ trackList }: RecentlyPlayedProps) => {
  const [view, setView] = useState<View>(View.LIST);

  const header = (
    <div className={styles['header']}>
      <h2>Recently Played</h2>
      <div className={styles['options']}>
        <button onClick={() => setView(View.GRID)}>
          <Image src={GridSVG} alt="Grid Icon" width={16} height={16}></Image>
        </button>
        <button onClick={() => setView(View.LIST)}>
          <Image src={ListSVG} alt="List Icon" width={16} height={16}></Image>
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles['recent-tracks']}>
      {header}
      {view === View.LIST && (
        <table className={styles['list']}>
          <tbody>
            {trackList.map((track) => (
              <tr key={track.id}>
                <td className={styles['artwork-col']}>
                  <Link href="#">
                    <Image
                      className={styles['artwork']}
                      src={track.Track.Album.artwork}
                      alt={track.Track.name}
                      width={40}
                      height={40}
                    ></Image>
                  </Link>
                </td>
                <td className={styles['track-col']}>
                  <Link href="#">{track.Track.name}</Link>
                </td>
                <td className={styles['artist-col']}>
                  <Link href="#">{track.Track.Album.Artist.name}</Link>
                </td>
                <td className={styles['time-col']}>
                  <p>{formatDate(track.playedAt)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles['footer']}>
        <Link href="#">View All</Link>
      </div>
    </div>
  );
};

export default RecentlyPlayed;
