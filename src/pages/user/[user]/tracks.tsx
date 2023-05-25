import { UserPage } from '@/components/user/profile_nav';
import { TopItemTypes } from '@/components/user/top_items/top_item_display';
import ViewAllList from '@/components/user/view_all_list';
import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/tracks.module.sass';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

/**
 * User Tracks page.
 */
const Tracks = () => {
  const user = useRouter().query.user;

  return (
    <div className={styles['tracks']}>
      {user && (
        <ViewAllList
          username={user as string}
          itemType={TopItemTypes.TRACK}
          pageSize={20}
        />
      )}
    </div>
  );
};

Tracks.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.TRACKS}>{page}</ProfileLayout>;
};

export default Tracks;
