import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/library/list.module.sass';

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
};

const TrackList = ({ tracks, heading }: TrackListProps) => {
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
              <td className={styles['rank-col']}>{index + 1}</td>
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
