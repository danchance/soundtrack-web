import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout, { LibraryPage } from '@/layouts/library_layout';
import styles from '@/styles/pages/library/album.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type AlbumResponse = {
  id: string;
  albumName: string;
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
        <div className={[styles['top'], styles['tracks']].join(' ')}>
          <h2>TRACKS</h2>
        </div>
        <div className={[styles['top'], styles['albums']].join(' ')}>
          <h2>MORE ALBUMS</h2>
        </div>
      </div>
      <div className={styles['secondary-col']}>
        <div className={[styles['top'], styles['listeners']].join(' ')}>
          <h2>TOP LISTENERS</h2>
        </div>
      </div>
    </div>
  );
};

Album.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout pageType={LibraryPage.ALBUM}>{page}</LibraryLayout>;
};

export default Album;
