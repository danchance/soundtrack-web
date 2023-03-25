import LoadingSpinner from '@/components/loading_spinner';
import { UserPage } from '@/components/profile_nav';
import TopItems, { TopItemTypes } from '@/components/top_items';
import ProfileLayout from '@/components/user_layout';
import useFetch from '@/hooks/useFetch';
import styles from '@/styles/pages/user/albums.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

type TopAlbums = {
  albums: Array<TopAlbum>;
};

type TopAlbum = {
  id: string;
  artistName: string;
  albumName: string;
  artwork: string;
  count: number;
};

/**
 * User Albums page.
 */
const Albums = () => {
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const { isLoading, error, data } = useFetch<TopAlbums>(url);

  useEffect(() => {
    if (router.query.user !== undefined) {
      setUrl(
        `http://localhost:8000/api/users/${router.query.user as string}/albums`
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
    <div className={styles['albums']}>
      {data && (
        <TopItems
          itemList={data.albums}
          itemType={TopItemTypes.ALBUM}
        ></TopItems>
      )}
    </div>
  );
};

Albums.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.ALBUMS}>{page}</ProfileLayout>;
};

export default Albums;
