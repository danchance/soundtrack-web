import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout from '@/layouts/library_layout';
import styles from '@/styles/pages/library/artist.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type ArtistResponse = {
  id: string;
  name: string;
};

const Artist = () => {
  const router = useRouter();
  const [url, setUrl] = useState<string>('');
  const { isLoading, error, data } = useFetch<ArtistResponse>(url);

  useEffect(() => {
    if (router.query.artist !== undefined) {
      setUrl(
        `http://localhost:8000/api/artists/${router.query.artist as string}`
      );
    }
  }, [router.query.artist]);

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
      <h1>{data!.name}</h1>
    </div>
  );
};

Artist.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout>{page}</LibraryLayout>;
};

export default Artist;
