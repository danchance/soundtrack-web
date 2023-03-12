import ProfileLayout from '@/components/user_layout';
import styles from '@/styles/pages/user/profile.module.sass';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';
import { UserPage } from '@/components/profile_nav';
import { useRouter } from 'next/router';

/**
 * User Profile page.
 */
const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const user = router.query.user as string;

  return (
    <div className={styles['overview']}>
      <h2>Tracks</h2>
      <h2>Albums</h2>
      <h2>Artists</h2>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.PROFILE}>{page}</ProfileLayout>;
};

export default Profile;
