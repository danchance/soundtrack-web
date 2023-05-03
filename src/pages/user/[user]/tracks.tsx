import LoadingSpinner from '@/components/loading_spinner';
import { UserPage } from '@/components/user/profile_nav';
import TopItemDisplay, {
  TopItemTypes
} from '@/components/user/top_items/top_item_display';
import ProfileLayout from '@/layouts/profile_layout';
import useFetch from '@/hooks/useFetch';
import styles from '@/styles/pages/user/tracks.module.sass';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { TopTrack } from '@/utils/types';
import { StyleType, Timeframe } from '@/pages/settings/profile';

type TracksResponse = {
  tracks: TopTrack[];
  topTracksStyle: StyleType;
  topTracksTimeframe: Timeframe;
};

/**
 * User Tracks page.
 */
const Tracks = () => {
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const { isLoading, error, data } = useFetch<TracksResponse>(url);

  useEffect(() => {
    if (router.query.user !== undefined) {
      setUrl(
        `http://localhost:8000/api/users/${router.query.user as string}/tracks`
      );
    }
  }, [router.query.user]);

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
    <div className={styles['tracks']}>
      {data && (
        <TopItemDisplay
          itemList={data.tracks}
          itemType={TopItemTypes.TRACK}
          defaultView={data.topTracksStyle}
          defaultTimeframe={data.topTracksTimeframe}
        />
      )}
    </div>
  );
};

Tracks.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.TRACKS}>{page}</ProfileLayout>;
};

export default Tracks;
