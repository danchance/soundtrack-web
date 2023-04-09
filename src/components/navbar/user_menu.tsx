import Image from 'next/image';
import styles from '@/styles/components/navbar/user_menu.module.sass';
import { User, useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import useComponentVisible from '@/hooks/useComponentVisible';
import ProfileIcon from '@/assets/icons/profile.png';
import LogoutIcon from '@/assets/icons/logout.png';
import SettingsIcon from '@/assets/icons/settings.png';

const UserMenu = ({ user }: { user: User }) => {
  const { ref, isVisible, setIsVisible } = useComponentVisible();
  const { logout } = useAuth0();

  return (
    <div className={styles['menu-container']}>
      <button
        className={styles['avatar-btn']}
        onClick={() => setIsVisible(!isVisible)}
      >
        <Image
          src={user.picture!}
          alt="Avatar Image"
          width="45"
          height="45"
          className={styles['avatar-img']}
        ></Image>
      </button>
      <nav
        ref={ref}
        className={`${styles['dropdown-container']} ${
          isVisible ? '' : styles['hidden']
        }`}
      >
        <section>
          <Image
            src={user.picture!}
            alt="Avatar Image"
            width="45"
            height="45"
            className={styles['avatar-img']}
          ></Image>
          <h2>{`@${user.username}`}</h2>
        </section>
        <section>
          <Link
            href={`/user/${user.username}`}
            className={styles['dropdown-item']}
            onClick={() => setIsVisible(false)}
          >
            <Image
              src={ProfileIcon}
              alt="Settings"
              width={18}
              height={18}
            ></Image>
            Profile
          </Link>
          <button
            className={styles['dropdown-item']}
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL
                }
              })
            }
          >
            <Image
              src={LogoutIcon}
              alt="Settings"
              width={18}
              height={18}
            ></Image>
            Log out
          </button>
        </section>
        <section>
          <Link
            href="/settings"
            className={styles['dropdown-item']}
            onClick={() => setIsVisible(false)}
          >
            <Image
              src={SettingsIcon}
              alt="Settings"
              width={18}
              height={18}
            ></Image>
            Settings
          </Link>
        </section>
      </nav>
    </div>
  );
};

export default UserMenu;
