import LoadingSpinner from '@/components/loading_spinner';
import { UserPage } from '@/components/profile_nav';
import TopItems, { TopItemTypes } from '@/components/top_items';
import ProfileLayout from '@/components/profile_layout';
import useFetch from '@/hooks/useFetch';
import styles from '@/styles/pages/user/tracks.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { TopTrack } from '@/utils/types';

/**
 * User Tracks page.
 */
const Tracks = () => {
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const { isLoading, error, data } = useFetch<{ tracks: TopTrack[] }>(url);

  useEffect(() => {
    if (router.query.user !== undefined) {
      setUrl(
        `http://localhost:8000/api/users/${router.query.user as string}/tracks`
      );
    }
  }, [router.query.user]);

  if (error) {
    return (
      <>
        <div className={styles['error']}>
          <p>Looks like something went wrong! :(</p>
          <button>Try again</button>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <LoadingSpinner height={5} />
      </>
    );
  }

  return (
    <div className={styles['tracks']}>
      {data && (
        <TopItems
          itemList={data.tracks}
          itemType={TopItemTypes.TRACK}
        ></TopItems>
      )}
    </div>
  );
};

Tracks.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.TRACKS}>{page}</ProfileLayout>;
};

export default Tracks;
