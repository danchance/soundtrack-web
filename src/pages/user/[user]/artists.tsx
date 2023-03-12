import { UserPage } from '@/components/profile_nav';
import ProfileLayout from '@/components/user_layout';
import styles from '@/styles/pages/user/artists.module.sass';
import { ReactElement } from 'react';

/**
 * User Artists page.
 */
const Artists = () => {
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
