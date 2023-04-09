import { UserPage } from '@/components/profile_nav';
import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/discover.module.sass';
import { ReactElement } from 'react';

/**
 * User Discover page.
 */
const Discover = () => {
  return (
    <div className={styles['discover']}>
      <h2>Discover</h2>
    </div>
  );
};

Discover.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.DISCOVER}>{page}</ProfileLayout>;
};

export default Discover;
