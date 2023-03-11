import ProfileNav from '@/components/profile_nav';
import styles from '@/styles/pages/profile.module.sass';
import { useRouter } from 'next/router';
import { useState } from 'react';

/**
 * User Profile page
 */
const Profile = () => {
  const router = useRouter();
  const user = router.query.user as string;

  return (
    <div className={styles['profile']}>
      <div className={styles['header']}>
        <div className={styles['image']}></div>
        <div className={styles['info']}>
          <div className={styles['text']}>
            <h1 className="">Username</h1>
            <p>Member since 2020</p>
          </div>
          {user !== undefined && <ProfileNav user={user} />}
        </div>
      </div>
      <h2>Tracks</h2>
      <h2>Albums</h2>
      <h3>Artists</h3>
    </div>
  );
};

export default Profile;
