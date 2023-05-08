import UserList from '@/components/library/user_list';
import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout, { LibraryPage } from '@/layouts/library_layout';
import styles from '@/styles/pages/library/track.module.sass';
import { formatTime } from '@/utils/format_date_time';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type TrackResponse = {
  id: string;
  name: string;
  album: {
    id: string;
    name: string;
    artwork: string;
    trackNum: number;
    releaseYear: number;
    duration: number;
    slug: string;
  };
  artist: {
    id: string;
    name: string;
    artwork: string;
    slug: string;
  };
  topListeners: {
    id: string;
    username: string;
    picture: string;
    count: number;
  }[];
  otherTracks: {
    id: string;
    name: string;
    artwork: string;
    trackSlug: string;
    albumSlug: string;
    artistSlug: string;
  }[];
};

const Track = () => {
  const { track } = useRouter().query;
  const [url, setUrl] = useState<string>('');
  const { isLoading, error, data } = useFetch<TrackResponse>(url);
  const router = useRouter();

  useEffect(() => {
    if (track !== undefined) {
      setUrl(`http://localhost:8000/api/tracks/${track as string}/data`);
    }
  }, [track]);

  if (error) {
    router.push('/500');
  }

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner size={2.5} weight={4} />
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      {data && (
        <>
          <div className={styles['primary-col']}>
            <div className={[styles['card'], styles['track-info']].join(' ')}>
              <div className={styles['artist']}>
                <Image
                  src={data!.artist.artwork}
                  alt={data!.artist.name}
                  width={40}
                  height={40}
                  className={styles['artist-img']}
                ></Image>
                <Link
                  href={{
                    pathname: `/library/[artist]`,
                    query: {
                      artist: data!.artist.slug
                    }
                  }}
                >
                  <h3 className={styles['artist-name']}>{data!.artist.name}</h3>
                </Link>
              </div>
              <div className={styles['album']}>
                <h3 className={styles['heading']}>APPEARS ON:</h3>
                <div className={styles['wrapper']}>
                  <Image
                    src={data!.album.artwork}
                    alt={data!.album.name}
                    width={150}
                    height={150}
                    className={styles['album-img']}
                  ></Image>
                  <div className={styles['info']}>
                    <Link
                      href={{
                        pathname: `/library/[artist]/[album]`,
                        query: {
                          artist: data!.artist.slug,
                          album: data!.album.slug
                        }
                      }}
                    >
                      <h3>{data!.album.name}</h3>
                    </Link>
                    <h4>Released: {data!.album.releaseYear}</h4>
                    <h4>Tracks: {data!.album.trackNum}</h4>
                    <h4>Length: {formatTime(data!.album.duration)}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className={[styles['card'], styles['more-tracks']].join(' ')}>
              <h2 className={styles['heading']}>MORE TRACKS</h2>
              <table className={styles['track-list']}>
                <tbody>
                  {data!.otherTracks.map((track, index) => {
                    if (index > 4) return;
                    return (
                      <tr key={track.id}>
                        <td className={styles['image-col']}>
                          <Image
                            src={track.artwork}
                            alt={track.name}
                            width={40}
                            height={40}
                            className={styles['track-img']}
                          ></Image>
                        </td>
                        <td className={styles['title-col']}>
                          <Link
                            key={track.id}
                            className={styles['track']}
                            href={{
                              pathname: `/library/[artist]/[album]/[track]`,
                              query: {
                                artist: track.artistSlug,
                                album: track.albumSlug,
                                track: track.trackSlug
                              }
                            }}
                          >
                            {track.name}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={styles['link-container']}>
                <Link href="#" className="">
                  All Tracks
                </Link>
              </div>
            </div>
          </div>
          <div className={styles['secondary-col']}>
            <UserList users={data!.topListeners} />
          </div>
        </>
      )}
    </div>
  );
};

Track.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout pageType={LibraryPage.TRACK}>{page}</LibraryLayout>;
};

export default Track;
