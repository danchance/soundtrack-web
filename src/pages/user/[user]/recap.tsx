import { UserPage } from '@/components/user/profile_nav';
import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/recap.module.sass';
import { ReactElement } from 'react';
import TempRobotImage from '@/assets/images/404.svg';
import Image from 'next/image';

/**
 * User Recap page.
 */
const Recap = () => {
  return (
    <div className={styles['container']}>
      <h2>COMING SOON...</h2>
      <Image
        src={TempRobotImage}
        alt="coming soon robot"
        width={200}
        height={200}
      ></Image>
    </div>
  );
};

Recap.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.RECAP}>{page}</ProfileLayout>;
};

export default Recap;
