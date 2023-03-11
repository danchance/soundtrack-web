import Link from 'next/link';
import styles from '@/styles/components/profile_nav.module.sass';
import { useState } from 'react';

/**
 * Used to define all items in the navigation list.
 */
enum NavItem {
  PROFILE = 'Profile',
  RECAP = 'Recap',
  TRACKS = 'Tracks',
  ARTISTS = 'Artists',
  ALBUMS = 'Albums'
}

/**
 * User Profile Navigation Component.
 */
const ProfileNav = ({ user }: { user: string }) => {
  // Track the current active navigation item.
  const [active, setActive] = useState<NavItem>(NavItem.PROFILE);
  // Build the current path as all nav links are relative to this.
  const path = `/user/${user}`;

  return (
    <div className={styles['navigation']}>
      <ul>
        <li
          className={[
            styles['list'],
            active === NavItem.PROFILE && styles['active']
          ].join(' ')}
          onClick={() => setActive(NavItem.PROFILE)}
        >
          <Link href={`${path}`}>Profile</Link>
        </li>
        <li
          className={[
            styles['list'],
            active === NavItem.RECAP && styles['active']
          ].join(' ')}
          onClick={() => setActive(NavItem.RECAP)}
        >
          <Link href={`${path}/recap`}>Recap</Link>
        </li>
        <li
          className={[
            styles['list'],
            active === NavItem.TRACKS && styles['active']
          ].join(' ')}
          onClick={() => setActive(NavItem.TRACKS)}
        >
          <Link href={`${path}/tracks`}>Tracks</Link>
        </li>
        <li
          className={[
            styles['list'],
            active === NavItem.ARTISTS && styles['active']
          ].join(' ')}
          onClick={() => setActive(NavItem.ARTISTS)}
        >
          <Link href={`${path}/artists`}>Artists</Link>
        </li>
        <li
          className={[
            styles['list'],
            active === NavItem.ALBUMS && styles['active']
          ].join(' ')}
          onClick={() => setActive(NavItem.ALBUMS)}
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
