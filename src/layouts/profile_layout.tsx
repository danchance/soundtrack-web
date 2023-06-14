import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProfileNav, { UserPage } from '../components/user/profile_nav';
import styles from '@/styles/layouts/profile_layout.module.sass';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import CurrentTrack from '@/components/user/current_track';
import Default404 from '@/components/default_404';
import { useAuth0 } from '@auth0/auth0-react';
import LockIcon from '@/assets/icons/lock.svg';
import Default500 from '@/components/default_500';
import useWindowSize from '@/hooks/useWindowSize';
import Head from 'next/head';

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
  privateProfile: boolean;
};

/**
 * Layout for all user pages.
 * Displays the users profile information and navigation at the top of
 * the page.
 */
const ProfileLayout = ({ children, page }: ProfileLayoutProps) => {
  const [url, setUrl] = useState<string>('');
  const [profileUser, setProfileUser] = useState<string>('');
  const [memberSince, setMemberSince] = useState<string>('');
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);
  const router = useRouter();
  const { error, data } = useFetch<User>(url);
  const { isLoading, user } = useAuth0();
  const { width } = useWindowSize();

  /**
   * Set the url to fetch the user data from.
   */
  useEffect(() => {
    if (router.query.user !== undefined) {
      setProfileUser(router.query.user as string);
      setUrl(
        `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/users/${
          router.query.user as string
        }/info`
      );
    }
  }, [router.query.user]);

  /**
   * Format the date the user joined for display and check if the profile
   * should be displayed. The profile is hidden if it is private and the
   * user is not the owner of the profile.
   */
  useEffect(() => {
    if (data) {
      const date = new Date(data.createdAt);
      setMemberSince(
        date.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      );
      !data.privateProfile || data.id === user?.sub
        ? setDisplayProfile(true)
        : setDisplayProfile(false);
    }
  }, [data, user]);

  /**
   * If the user is not found, display the 404 page, otherwise display the
   * 500 Server Error page.
   */
  if (error) {
    if (error.status === 404) {
      return (
        <>
          <div className={styles['nav-background']}></div>
          <Default404 />
        </>
      );
    }
    router.push('/500');
  }

  return (
    <>
      {profileUser && (
        <Head>
          <title>
            {profileUser}&apos;s Profile |{' '}
            {page[0].toUpperCase() + page.slice(1)}
          </title>
        </Head>
      )}
      <div className={styles['nav-background']}></div>
      {profileUser && (
        <>
          {width <= 800 && (
            <div className={styles['nav']}>
              <ProfileNav user={profileUser} page={page} />
            </div>
          )}
          <div className={styles['container']}>
            {data && (
              <>
                <div
                  className={[styles['profile-header'], styles['card']].join(
                    ' '
                  )}
                >
                  <div className={styles['header-img']}>
                    <Image
                      src={data.bannerImage}
                      alt=""
                      fill
                      priority={true}
                    ></Image>
                  </div>
                  <div className={styles['profile-info']}>
                    <Image
                      src={data.image}
                      alt={`${profileUser} avatar`}
                      width={200}
                      height={200}
                      className={styles['avatar-img']}
                      priority={true}
                    ></Image>
                    <div className={styles['user']}>
                      <div className={styles['user-data']}>
                        <h1>@{profileUser}</h1>
                        <p>Joined on {memberSince}</p>
                        {displayProfile && (
                          <p>
                            <span className={styles['stream-count']}>
                              {data.streamCount.toLocaleString()}
                            </span>{' '}
                            streams
                          </p>
                        )}
                      </div>
                      {width > 800 && <CurrentTrack userid={data.id} />}
                    </div>
                  </div>
                  {width > 800 && (
                    <div className={styles['nav']}>
                      <ProfileNav user={profileUser} page={page} />
                    </div>
                  )}
                </div>
                {displayProfile && children}
                {!isLoading && displayProfile === false && (
                  <div
                    className={[styles['card'], styles['private']].join(' ')}
                  >
                    <Image
                      src={LockIcon}
                      alt="private profile"
                      width={100}
                      height={100}
                      className={styles['lock-img']}
                    ></Image>
                    <div className={styles['tag']}>PRIVATE</div>
                    <h2 className={styles['private-msg']}>
                      {"This user's profile is private."}
                    </h2>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileLayout;
