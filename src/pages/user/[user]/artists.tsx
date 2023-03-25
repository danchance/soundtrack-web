import { UserPage } from '@/components/profile_nav';
import ProfileLayout from '@/components/user_layout';
import styles from '@/styles/pages/user/artists.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * User Artists page.
 */
const Artists = () => {
  const router = useRouter();
  const user = router.query.user as string;

  useEffect(() => {
    (async () => {
      if (user !== undefined) {
        const data = await fetch(
          `http://localhost:8000/api/users/${user}/artists`
        );
        console.log(await data.json());
      }
    })();
  }, [user]);

  return (
    <div className={styles['artists']}>
      <h2>Artists</h2>
    </div>
  );
};

Artists.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.ARTISTS}>{page}</ProfileLayout>;
};

export default Artists;
