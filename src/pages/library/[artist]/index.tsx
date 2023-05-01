import TrackList from '@/components/library/track_list';
import UserList from '@/components/library/user_list';
import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout, { LibraryPage } from '@/layouts/library_layout';
import styles from '@/styles/pages/library/artist.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import GoldMedal from '@/assets/icons/gold.png';
import SilverMedal from '@/assets/icons/silver.png';
import BronzeMedal from '@/assets/icons/bronze.png';

type ArtistResponse = {
  id: string;
  artistName: string;
  artistSlug: string;
  topTracks: {
    id: string;
    trackName: string;
    duration: number;
    artwork: string;
    count: number;
    trackSlug: string;
    albumSlug: string;
    artistSlug: string;
  }[];
  topAlbums: {
    id: string;
    albumName: string;
    artwork: string;
    count: number;
    albumSlug: string;
  }[];
  topListeners: {
    id: string;
    username: string;
    picture: string;
    count: number;
  }[];
};

const Artist = () => {
  const { artist } = useRouter().query;
  const [url, setUrl] = useState<string>('');
  const { isLoading, error, data } = useFetch<ArtistResponse>(url);

  useEffect(() => {
    if (artist !== undefined) {
      setUrl(`http://localhost:8000/api/artists/${artist as string}/data`);
    }
  }, [artist]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner height={5} />
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <div className={styles['primary-col']}>
        <TrackList
          tracks={data!.topTracks}
          heading="TOP TRACKS"
          medals={true}
        />
        <div className={[styles['top'], styles['albums']].join(' ')}>
          <h2 className={styles['heading']}>TOP ALBUMS</h2>
          <table>
            <thead>
              <tr>
                <th className={styles['rank-col']}>#</th>
                <th className={styles['image-col']}></th>
                <th className={styles['title-col']}>Title</th>
                <th className={styles['streams-col']}>Streams</th>
              </tr>
            </thead>
            <tbody>
              {data!.topAlbums.map((album, index) => (
                <tr key={album.id}>
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
                  <td className={styles['image-col']}>
                    <Link
                      href={{
                        pathname: `/library/[artist]/[album]/`,
                        query: {
                          artist: data!.artistSlug,
                          album: album.albumSlug
                        }
                      }}
                    >
                      <Image
                        src={album.artwork}
                        alt=""
                        width={40}
                        height={40}
                      ></Image>
                    </Link>
                  </td>
                  <td className={styles['title-col']}>
                    <Link
                      href={{
                        pathname: `/library/[artist]/[album]`,
                        query: {
                          artist: data!.artistSlug,
                          album: album.albumSlug
                        }
                      }}
                    >
                      {album.albumName}
                    </Link>
                  </td>
                  <td className={styles['streams-col']}>{album.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles['secondary-col']}>
        <UserList users={data!.topListeners} />
      </div>
    </div>
  );
};

Artist.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout pageType={LibraryPage.ARTIST}>{page}</LibraryLayout>;
};

export default Artist;
