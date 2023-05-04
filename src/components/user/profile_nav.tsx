import Link from 'next/link';
import styles from '@/styles/components/user/profile_nav.module.sass';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * Define all items in the user profile navigation list.
 */
export enum UserPage {
  PROFILE = 'profile',
  RECAP = 'recap',
  DISCOVER = 'discover',
  TRACKS = 'tracks',
  ARTISTS = 'artists',
  ALBUMS = 'albums'
}

/**
 * User Profile Navigation Component.
 * @param user The user's username.
 * @param page The current active page.
 */
const ProfileNav = ({ user, page }: { user: string; page: UserPage }) => {
  // Track the current active navigation item.
  const [active, setActive] = useState<UserPage>(page);
  // Build the current path as all nav links are relative to this.
  const path = `/user/${user}`;
  const router = useRouter();

  useEffect(() => {
    setActive(
      router.pathname.substring(
        router.pathname.lastIndexOf('/') + 1
      ) as UserPage
    );
  }, [router.pathname]);

  return (
    <div className={styles['navigation']}>
      <ul>
        <li className={active === UserPage.PROFILE ? styles['active'] : ''}>
          <Link href={`${path}/profile`}>PROFILE</Link>
        </li>
        <li className={active === UserPage.RECAP ? styles['active'] : ''}>
          <Link href={`${path}/recap`}>RECAP</Link>
        </li>
        <li className={active === UserPage.DISCOVER ? styles['active'] : ''}>
          <Link href={`${path}/discover`}>DISCOVER</Link>
        </li>
        <li
          className={active === UserPage.TRACKS ? styles['active'] : ''}
          onClick={() => setActive(UserPage.TRACKS)}
        >
          <Link href={`${path}/tracks`}>TRACKS</Link>
        </li>
        <li className={active === UserPage.ARTISTS ? styles['active'] : ''}>
          <Link href={`${path}/artists`}>ARTISTS</Link>
        </li>
        <li className={active === UserPage.ALBUMS ? styles['active'] : ''}>
          <Link href={`${path}/albums`}>ALBUMS</Link>
        </li>
        <div className={styles['indicator']}></div>
      </ul>
    </div>
  );
};

export default ProfileNav;
