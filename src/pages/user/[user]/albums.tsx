import { UserPage } from '@/components/profile_nav';
import ProfileLayout from '@/components/user_layout';
import useFetch from '@/hooks/useFetch';
import styles from '@/styles/pages/user/albums.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * User Albums page.
 */
const Albums = () => {
  const router = useRouter();
  const user = router.query.user as string;

  useEffect(() => {
    (async () => {
      if (user !== undefined) {
        const data = await fetch(
          `http://localhost:8000/api/users/${user}/albums`
        );
        console.log(await data.json());
      }
    })();
  }, [user]);

  return (
    <div className={styles['albums']}>
      <h2>Albums</h2>
    </div>
  );
};

Albums.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.ALBUMS}>{page}</ProfileLayout>;
};

export default Albums;
