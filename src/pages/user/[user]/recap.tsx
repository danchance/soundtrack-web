import { UserPage } from '@/components/profile_nav';
import UserLayout from '@/components/user_layout';
import styles from '@/styles/pages/user/recap.module.sass';
import { ReactElement } from 'react';

/**
 * User Recap page.
 */
const Recap = () => {
  return (
    <div className={styles['recap']}>
      <h2>Recap</h2>
    </div>
  );
};

Recap.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout page={UserPage.RECAP}>{page}</UserLayout>;
};

export default Recap;
