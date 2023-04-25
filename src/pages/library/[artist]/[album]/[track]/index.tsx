import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout from '@/layouts/library_layout';
import styles from '@/styles/pages/library/track.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type TrackResponse = {
  id: string;
  name: string;
};

const Track = () => {
  const router = useRouter();
  const [url, setUrl] = useState<string>('');
  const { isLoading, error, data } = useFetch<TrackResponse>(url);

  useEffect(() => {
    if (router.query.track !== undefined) {
      setUrl(
        `http://localhost:8000/api/tracks/${router.query.track as string}`
      );
    }
  }, [router.query.track]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

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

Track.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout>{page}</LibraryLayout>;
};

export default Track;
