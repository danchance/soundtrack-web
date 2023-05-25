import { UserPage } from '@/components/user/profile_nav';
import { TopItemTypes } from '@/components/user/top_items/top_item_display';
import ViewAllList from '@/components/user/view_all_list';
import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/albums.module.sass';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

/**
 * User Albums page.
 */
const Albums = () => {
  const user = useRouter().query.user;

  return (
    <div className={styles['albums']}>
      {user && (
        <ViewAllList
          username={user as string}
          itemType={TopItemTypes.ALBUM}
          pageSize={20}
        />
      )}
    </div>
  );
};

Albums.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.ALBUMS}>{page}</ProfileLayout>;
};

export default Albums;
