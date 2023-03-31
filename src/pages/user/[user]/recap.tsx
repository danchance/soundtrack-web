import { UserPage } from '@/components/profile_nav';
import ProfileLayout from '@/components/profile_layout';
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
  return <ProfileLayout page={UserPage.RECAP}>{page}</ProfileLayout>;
};

export default Recap;
