import { UserPage } from '@/components/user/profile_nav';
import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/discover.module.sass';
import { ReactElement } from 'react';
import TempRobotImage from '@/assets/images/404.svg';
import Image from 'next/image';

/**
 * User Discover page.
 */
const Discover = () => {
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

Discover.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.DISCOVER}>{page}</ProfileLayout>;
};

export default Discover;
