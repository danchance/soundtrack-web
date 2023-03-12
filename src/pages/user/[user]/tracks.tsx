import { UserPage } from '@/components/profile_nav';
import ProfileLayout from '@/components/user_layout';
import styles from '@/styles/pages/user/tracks.module.sass';
import { ReactElement } from 'react';

/**
 * User Tracks page.
 */
const Tracks = () => {
  return (
    <div className={styles['tracks']}>
      <h2>Tracks</h2>
    </div>
  );
};

Tracks.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.TRACKS}>{page}</ProfileLayout>;
};

export default Tracks;
