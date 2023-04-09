import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProfileNav, { UserPage } from '../components/profile_nav';
import styles from '@/styles/layouts/profile_layout.module.sass';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import NotFoundImage from '@/assets/images/404.svg';
import Link from 'next/link';

type ProfileLayoutProps = {
  children: React.ReactNode;
  page: UserPage;
};

type User = {
  id: string;
  username: string;
  image: string;
  createdAt: string;
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
  const { isLoading, error, data } = useFetch<{ user: User }>(url);

  useEffect(() => {
    if (router.query.user !== undefined) {
      setUrl(`http://localhost:8000/api/users/${router.query.user as string}`);
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

  if (error) {
    if (error.status === 404) {
      return (
        <div className={styles['error']}>
          <div className={styles['info']}>
            <h1>{"It's Empty Here"}</h1>
            <p>
              {
                "Looks like this page can't be found. Maybe it was moved or renamed"
              }
            </p>
            <Link href="/">BACK TO HOMEPAGE</Link>
          </div>
          <Image
            src={NotFoundImage}
            alt={error.message}
            width={600}
            height={600}
          ></Image>
        </div>
      );
    }
    return <></>;
  }

  return (
    <div className={styles['profile']}>
      {data && (
        <div className={styles['header']}>
          <Image
            src={data.user.image}
            alt={`${data.user.username} profile picture`}
            width={150}
            height={150}
            className={styles['profile-image']}
          ></Image>
          <div className={styles['info']}>
            <div className={styles['text']}>
              <h1 className="">{data.user.username}</h1>
              <p>Member since {memberSince}</p>
            </div>
            <ProfileNav user={data.user.username} page={page} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default ProfileLayout;
