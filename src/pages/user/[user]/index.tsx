import ProfileLayout from '@/components/user_layout';
import styles from '@/styles/pages/user/profile.module.sass';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { UserPage } from '@/components/profile_nav';
import { useRouter } from 'next/router';
import RecentlyPlayed from '@/components/recently_played';

/**
 * User Profile page.
 */
const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const user = router.query.user as string;

  return (
    <div className={styles['overview']}>
      {user !== undefined && <RecentlyPlayed user={user} />}
      <div className={styles['section']}>
        <h2>Top Tracks</h2>
      </div>
      <div className={styles['section']}>
        <h2>Top Albums</h2>
      </div>
      <div className={styles['section']}>
        <h2>Top Artists</h2>
      </div>
      <div className={styles['section']}>
        <h2>Top Genres</h2>
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.PROFILE}>{page}</ProfileLayout>;
};

export default Profile;
