import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/profile.module.sass';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { UserPage } from '@/components/user/profile_nav';
import { useRouter } from 'next/router';
import TrackHistory from '@/components/user/track_history';
import TopItemDisplay, {
  TopItemTypes
} from '@/components/user/top_items/top_item_display';

/**
 * User Profile page.
 */
const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.user) {
      setUsername(router.query.user as string);
    } else {
      setUsername(null);
    }
  }, [router.query.user]);

  return (
    <div className={styles['container']}>
      {username && (
        <>
          <TrackHistory username={username} />
          <TopItemDisplay username={username} itemType={TopItemTypes.TRACK} />
          <TopItemDisplay username={username} itemType={TopItemTypes.ALBUM} />
          <TopItemDisplay username={username} itemType={TopItemTypes.ARTIST} />
        </>
      )}
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.PROFILE}>{page}</ProfileLayout>;
};

export default Profile;
