import { UserPage } from '@/components/user/profile_nav';
import TopItemDisplay, {
  TopItemTypes
} from '@/components/user/top_items/top_item_display';
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
        <TopItemDisplay
          username={user as string}
          itemType={TopItemTypes.ALBUM}
        />
      )}
    </div>
  );
};

Albums.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.ALBUMS}>{page}</ProfileLayout>;
};

export default Albums;
