import Link from 'next/link';
import styles from '@/styles/components/profile_nav.module.sass';
import { useState } from 'react';

/**
 * Used to define all items in the navigation list.
 */
export enum UserPage {
  PROFILE = 'Profile',
  RECAP = 'Recap',
  DISCOVER = 'Discover',
  TRACKS = 'Tracks',
  ARTISTS = 'Artists',
  ALBUMS = 'Albums'
}

/**
 * User Profile Navigation Component.
 */
const ProfileNav = ({ user, page }: { user: string; page: UserPage }) => {
  // Track the current active navigation item.
  const [active, setActive] = useState<UserPage>(page);
  // Build the current path as all nav links are relative to this.
  const path = `/user/${user}`;

  return (
    <div className={styles['navigation']}>
      <ul>
        <li
          className={active === UserPage.PROFILE ? styles['active'] : ''}
          onClick={() => setActive(UserPage.PROFILE)}
        >
          <Link href={`${path}`}>PROFILE</Link>
        </li>
        <li
          className={active === UserPage.RECAP ? styles['active'] : ''}
          onClick={() => setActive(UserPage.RECAP)}
        >
          <Link href={`${path}/recap`}>RECAP</Link>
        </li>
        <li
          className={active === UserPage.DISCOVER ? styles['active'] : ''}
          onClick={() => setActive(UserPage.DISCOVER)}
        >
          <Link href={`${path}/discover`}>DISCOVER</Link>
        </li>
        <li
          className={active === UserPage.TRACKS ? styles['active'] : ''}
          onClick={() => setActive(UserPage.TRACKS)}
        >
          <Link href={`${path}/tracks`}>TRACKS</Link>
        </li>
        <li
          className={active === UserPage.ARTISTS ? styles['active'] : ''}
          onClick={() => setActive(UserPage.ARTISTS)}
        >
          <Link href={`${path}/artists`}>ARTISTS</Link>
        </li>
        <li
          className={active === UserPage.ALBUMS ? styles['active'] : ''}
          onClick={() => setActive(UserPage.ALBUMS)}
        >
          <Link href={`${path}/albums`}>ALBUMS</Link>
        </li>
        <div className={styles['indicator']}></div>
      </ul>
    </div>
  );
};

export default ProfileNav;
