import { UserPage } from '@/components/profile_nav';
import RecentlyPlayed from '@/components/recently_played';
import ProfileLayout from '@/components/user_layout';
import styles from '@/styles/pages/user/tracks.module.sass';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

/**
 * User Tracks page.
 */
const Tracks = () => {
  const router = useRouter();
  const user = router.query.user as string;

  return (
    <div className={styles['tracks']}>
      <RecentlyPlayed user={user} />
    </div>
  );
};

Tracks.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.TRACKS}>{page}</ProfileLayout>;
};

export default Tracks;
