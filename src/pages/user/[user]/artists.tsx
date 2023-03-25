import LoadingSpinner from '@/components/loading_spinner';
import { UserPage } from '@/components/profile_nav';
import TopItems, { TopItemTypes } from '@/components/top_items';
import ProfileLayout from '@/components/profile_layout';
import useFetch from '@/hooks/useFetch';
import styles from '@/styles/pages/user/artists.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { TopArtist } from '@/utils/types';

/**
 * User Artists page.
 */
const Artists = () => {
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const { isLoading, error, data } = useFetch<{ artists: TopArtist[] }>(url);

  useEffect(() => {
    if (router.query.user !== undefined) {
      setUrl(
        `http://localhost:8000/api/users/${router.query.user as string}/artists`
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
    <div className={styles['artists']}>
      {data && (
        <TopItems itemList={data.artists} itemType={TopItemTypes.ARTIST} />
      )}
    </div>
  );
};

Artists.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.ARTISTS}>{page}</ProfileLayout>;
};

export default Artists;
