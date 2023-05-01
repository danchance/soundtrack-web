import UserList from '@/components/library/user_list';
import LoadingSpinner from '@/components/loading_spinner';
import useFetch from '@/hooks/useFetch';
import LibraryLayout, { LibraryPage } from '@/layouts/library_layout';
import styles from '@/styles/pages/library/track.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type TrackResponse = {
  id: string;
  name: string;
  topListeners: {
    id: string;
    username: string;
    picture: string;
    count: number;
  }[];
};

const Track = () => {
  const { track } = useRouter().query;
  const [url, setUrl] = useState<string>('');
  const { isLoading, error, data } = useFetch<TrackResponse>(url);

  useEffect(() => {
    if (track !== undefined) {
      setUrl(`http://localhost:8000/api/tracks/${track as string}/data`);
    }
  }, [track]);

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
        <UserList users={data!.topListeners} />
      </div>
    </div>
  );
};

Track.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout pageType={LibraryPage.TRACK}>{page}</LibraryLayout>;
};

export default Track;
