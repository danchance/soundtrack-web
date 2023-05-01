import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/library/list.module.sass';
import GoldMedal from '@/assets/icons/gold.png';
import SilverMedal from '@/assets/icons/silver.png';
import BronzeMedal from '@/assets/icons/bronze.png';

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
 * @param tracks List of track to display.
 * @param heading Heading to display above the list.
 * @param medals Whether to display gold, silver and bronze medals or not.
 */
const TrackList = ({ tracks, heading, medals }: TrackListProps) => {
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
          {tracks.map((track, index) => (
            <tr key={track.id}>
              {!medals && <td className={styles['rank-col']}>{index + 1}</td>}
              {medals && (
                <td className={styles['rank-col']}>
                  {index === 0 && (
                    <Image
                      src={GoldMedal}
                      alt="1"
                      width={30}
                      height={30}
                    ></Image>
                  )}
                  {index === 1 && (
                    <Image
                      src={SilverMedal}
                      alt="2"
                      width={30}
                      height={30}
                    ></Image>
                  )}
                  {index === 2 && (
                    <Image
                      src={BronzeMedal}
                      alt="3"
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;
