import { UserPage } from '@/components/profile_nav';
import UserLayout from '@/components/user_layout';
import styles from '@/styles/pages/user/albums.module.sass';
import { ReactElement } from 'react';

/**
 * User Albums page.
 */
const Albums = () => {
  return (
    <div className={styles['albums']}>
      <h2>Albums</h2>
    </div>
  );
};

Albums.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout page={UserPage.ALBUMS}>{page}</UserLayout>;
};

export default Albums;
