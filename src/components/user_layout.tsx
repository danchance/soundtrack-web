import { useRouter } from 'next/router';
import React from 'react';
import ProfileNav, { UserPage } from './profile_nav';
import styles from '@/styles/components/profile_layout.module.sass';

type ProfileLayoutProps = {
  children: React.ReactNode;
  page: UserPage;
};

/**
 * Layout for all user pages.
 */
const ProfileLayout = ({ children, page }: ProfileLayoutProps) => {
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
          {user !== undefined && <ProfileNav user={user} page={page} />}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProfileLayout;
