import Link from 'next/link';
import styles from '@/styles/components/profile_nav.module.sass';
import { useState } from 'react';

/**
 * Used to define all items in the navigation list.
 */
export enum UserPage {
  PROFILE = 'Profile',
  RECAP = 'Recap',
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
          className={[
            styles['list'],
            active === UserPage.PROFILE && styles['active']
          ].join(' ')}
          onClick={() => setActive(UserPage.PROFILE)}
        >
          <Link href={`${path}`}>Profile</Link>
        </li>
        <li
          className={[
            styles['list'],
            active === UserPage.RECAP && styles['active']
          ].join(' ')}
          onClick={() => setActive(UserPage.RECAP)}
        >
          <Link href={`${path}/recap`}>Recap</Link>
        </li>
        <li
          className={[
            styles['list'],
            active === UserPage.TRACKS && styles['active']
          ].join(' ')}
          onClick={() => setActive(UserPage.TRACKS)}
        >
          <Link href={`${path}/tracks`}>Tracks</Link>
        </li>
        <li
          className={[
            styles['list'],
            active === UserPage.ARTISTS && styles['active']
          ].join(' ')}
          onClick={() => setActive(UserPage.ARTISTS)}
        >
          <Link href={`${path}/artists`}>Artists</Link>
        </li>
        <li
          className={[
            styles['list'],
            active === UserPage.ALBUMS && styles['active']
          ].join(' ')}
          onClick={() => setActive(UserPage.ALBUMS)}
        >
          <Link href={`${path}/albums`}>Albums</Link>
        </li>
        <div className={styles['indicator']}></div>
      </ul>
      <div className={styles['underline']}></div>
    </div>
  );
};

export default ProfileNav;
