import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/profile.module.sass';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';
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
  const user = useRouter().query.user;

  return (
    <div className={styles['container']}>
      {user && (
        <>
          <TrackHistory username={user as string} />
          <TopItemDisplay
            username={user as string}
            itemType={TopItemTypes.TRACK}
          />
          <TopItemDisplay
            username={user as string}
            itemType={TopItemTypes.ALBUM}
          />
          <TopItemDisplay
            username={user as string}
            itemType={TopItemTypes.ARTIST}
          />
        </>
      )}
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.PROFILE}>{page}</ProfileLayout>;
};

export default Profile;
