import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout from '@/layouts/library_layout';
import styles from '@/styles/pages/library/album.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type AlbumResponse = {
  id: string;
  name: string;
};

const Album = () => {
  const router = useRouter();
  const [url, setUrl] = useState<string>('');
  const { isLoading, error, data } = useFetch<AlbumResponse>(url);

  useEffect(() => {
    if (router.query.album !== undefined) {
      setUrl(
        `http://localhost:8000/api/albums/${router.query.album as string}`
      );
    }
  }, [router.query.album]);

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

  return <div className={styles['container']}>{<h1>{data!.name}</h1>}</div>;
};

Album.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout>{page}</LibraryLayout>;
};

export default Album;
