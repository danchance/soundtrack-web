import { UserPage } from '@/components/user/profile_nav';
import { TopItemTypes } from '@/components/user/top_items/top_item_display';
import ViewAllList from '@/components/user/view_all_list';
import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/artists.module.sass';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

/**
 * User Artists page.
 */
const Artists = () => {
  const user = useRouter().query.user;

  return (
    <div className={styles['artists']}>
      {user && (
        <ViewAllList
          username={user as string}
          itemType={TopItemTypes.ARTIST}
          pageSize={20}
        />
      )}
    </div>
  );
};

Artists.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.ARTISTS}>{page}</ProfileLayout>;
};

export default Artists;
