import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/library/list.module.sass';
import GoldMedal from '@/assets/icons/gold.png';
import SilverMedal from '@/assets/icons/silver.png';
import BronzeMedal from '@/assets/icons/bronze.png';
import { useState } from 'react';

type TrackListProps = {
  tracks: {
    id: string;
    trackName: string;
    duration: number;
    artwork: string;
    count: number;
    trackSlug: string;
    albumSlug: string;
    artistSlug: string;
  }[];
  heading: string;
  medals: boolean;
};

/**
 * Component for displaying a list of tracks, used on the album and artist pages.
 * Displays 10 tracks by default. If there are more than 10 tracks pressing the
 * Show All" button will display all tracks.
 * @param tracks List of track to display.
 * @param heading Heading to display above the list.
 * @param medals Whether to display gold, silver and bronze medals or not.
 */
const TrackList = ({ tracks, heading, medals }: TrackListProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <div className={styles['container']}>
      <h2 className={styles['heading']}>{heading}</h2>
      <table>
        <thead>
          <tr>
            <th className={styles['rank-col']}>#</th>
            <th className={styles['image-col']}></th>
            <th className={styles['title-col']}>Title</th>
            <th className={styles['streams-col']}>Streams</th>
            <th className={styles['duration-col']}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => {
            if (!showAll && index >= 10) return;
            return (
              <tr key={track.id}>
                {!medals && <td className={styles['rank-col']}>{index + 1}</td>}
                {medals && (
                  <td className={styles['rank-col']}>
                    {index <= 2 && (
                      <Image
                        src={
                          index === 0
                            ? GoldMedal
                            : index === 1
                            ? SilverMedal
                            : BronzeMedal
                        }
                        alt={(index + 1).toString()}
                        width={30}
                        height={30}
                      ></Image>
                    )}
                    {index > 2 && index + 1}
                  </td>
                )}
                <td className={styles['image-col']}>
                  <Link
                    href={{
                      pathname: `/library/[artist]/[album]/[track]`,
                      query: {
                        artist: track.artistSlug,
                        album: track.albumSlug,
                        track: track.trackSlug
                      }
                    }}
                  >
                    <Image
                      src={track.artwork}
                      alt=""
                      width={40}
                      height={40}
                    ></Image>
                  </Link>
                </td>
                <td className={styles['title-col']}>
                  <Link
                    href={{
                      pathname: `/library/[artist]/[album]/[track]`,
                      query: {
                        artist: track.artistSlug,
                        album: track.albumSlug,
                        track: track.trackSlug
                      }
                    }}
                  >
                    {track.trackName}
                  </Link>
                </td>
                <td className={styles['streams-col']}>{track.count}</td>
                <td className={styles['duration-col']}>
                  {new Date(track.duration).toISOString().slice(14, -5)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles['button-container']}>
        {tracks.length > 10 && (
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackList;
