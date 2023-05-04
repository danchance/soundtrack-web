import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/profile.module.sass';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { UserPage } from '@/components/user/profile_nav';
import { useRouter } from 'next/router';
import RecentlyPlayed from '@/components/user/recently_played';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/loading_spinner';
import { RecentlyPlayedTrack } from '@/utils/types';
import TopItemDisplay, {
  TopItemTypes
} from '@/components/user/top_items/top_item_display';

type RecentlyPlayedResponse = {
  recentTracks: RecentlyPlayedTrack[];
};

/**
 * User Profile page.
 */
const Profile: NextPageWithLayout = () => {
  const user = useRouter().query.user;
  const [url, setUrl] = useState<string>('');
  const { isLoading, error, data } = useFetch<RecentlyPlayedResponse>(url);

  /**
   *
   *
   * TODO: Change request to recently played endpoint and remove profile endpoint.
   *
   *
   *
   */
  useEffect(() => {
    if (user !== undefined) {
      setUrl(`http://localhost:8000/api/users/${user as string}/profile`);
    }
  }, [user]);

  if (error) {
    return (
      <>
        <div className={styles['error']}>
          <p>Looks like something went wrong! :(</p>
          <button>Try again</button>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className={styles['spinner']}>
        <LoadingSpinner height={5} />
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      {data && <RecentlyPlayed itemList={data.recentTracks} />}
      {user && (
        <>
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
