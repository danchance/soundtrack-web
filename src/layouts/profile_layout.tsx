import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProfileNav, { UserPage } from '../components/user/profile_nav';
import styles from '@/styles/layouts/profile_layout.module.sass';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import CurrentTrack from '@/components/user/current_track';
import Default404 from '@/components/default_404';

type ProfileLayoutProps = {
  children: React.ReactNode;
  page: UserPage;
};

type User = {
  id: string;
  username: string;
  image: string;
  bannerImage: string;
  createdAt: string;
  streamCount: number;
};

/**
 * Layout for all user pages.
 * Displays the users profile information and navigation at the top of
 * the page.
 */
const ProfileLayout = ({ children, page }: ProfileLayoutProps) => {
  const [url, setUrl] = useState<string>('');
  const [memberSince, setMemberSince] = useState<string>('');
  const router = useRouter();
  const { error, data } = useFetch<{ user: User }>(url);

  useEffect(() => {
    if (router.query.user !== undefined) {
      setUrl(
        `http://localhost:8000/api/users/${router.query.user as string}/info`
      );
    }
  }, [router.query.user]);

  useEffect(() => {
    if (data) {
      const date = new Date(data.user.createdAt);
      setMemberSince(
        date.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      );
    }
  }, [data]);

  if (error && error.status === 404) {
    return (
      <>
        <div className={styles['nav-background']}></div>
        <Default404 />
      </>
    );
  }

  return (
    <>
      <div className={styles['nav-background']}></div>
      <div className={styles['container']}>
        {data && (
          <>
            <div className={styles['profile-header']}>
              <div className={styles['header-img']}>
                <Image src={data.user.bannerImage} alt="" fill></Image>
              </div>
              <div className={styles['profile-info']}>
                <Image
                  src={data.user.image}
                  alt={`${data.user.username} avatar`}
                  width={200}
                  height={200}
                  className={styles['avatar-img']}
                ></Image>
                <div className={styles['user']}>
                  <div className={styles['user-data']}>
                    <h1>@{data.user.username}</h1>
                    <p>Member since {memberSince}</p>
                    <p>
                      <span className={styles['stream-count']}>
                        {data.user.streamCount.toLocaleString()}
                      </span>{' '}
                      streams
                    </p>
                  </div>
                  <CurrentTrack userid={data.user.id} />
                </div>
              </div>
              <div className={styles['nav']}>
                <ProfileNav user={data.user.username} page={page} />
              </div>
            </div>
            {children}
          </>
        )}
      </div>
    </>
  );
};

export default ProfileLayout;
