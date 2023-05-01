import TrackList from '@/components/library/track_list';
import UserList from '@/components/library/user_list';
import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout, { LibraryPage } from '@/layouts/library_layout';
import styles from '@/styles/pages/library/album.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type AlbumResponse = {
  id: string;
  albumName: string;
  albumSlug: string;
  albumArtwork: string;
  artistName: string;
  artistSlug: string;
  albumTracks: {
    id: string;
    trackName: string;
    duration: number;
    artwork: string;
    count: number;
    trackSlug: string;
    albumSlug: string;
    artistSlug: string;
  }[];
  topListeners: {
    id: string;
    username: string;
    picture: string;
    count: number;
  }[];
  otherAlbums: {
    id: string;
    albumName: string;
    artwork: string;
    albumSlug: string;
  };
};

const Album = () => {
  const { album } = useRouter().query;
  const [url, setUrl] = useState<string>('');
  const { isLoading, error, data } = useFetch<AlbumResponse>(url);

  useEffect(() => {
    if (album !== undefined) {
      setUrl(`http://localhost:8000/api/albums/${album as string}/data`);
    }
  }, [album]);

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
        <TrackList tracks={data!.albumTracks} />
        <div className={[styles['top'], styles['albums']].join(' ')}>
          <h2 className={styles['heading']}>MORE ALBUMS</h2>
        </div>
      </div>
      <div className={styles['secondary-col']}>
        <UserList users={data!.topListeners} />
      </div>
    </div>
  );
};

Album.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout pageType={LibraryPage.ALBUM}>{page}</LibraryLayout>;
};

export default Album;
