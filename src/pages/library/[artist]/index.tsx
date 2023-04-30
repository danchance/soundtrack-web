import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout, { LibraryPage } from '@/layouts/library_layout';
import styles from '@/styles/pages/library/artist.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type ArtistResponse = {
  id: string;
  artistName: string;
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
        <div className={[styles['top'], styles['tracks']].join(' ')}>
          <h2>TOP TRACKS</h2>
        </div>
        <div className={[styles['top'], styles['albums']].join(' ')}>
          <h2>TOP ALBUMS</h2>
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

Artist.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout pageType={LibraryPage.ARTIST}>{page}</LibraryLayout>;
};

export default Artist;
