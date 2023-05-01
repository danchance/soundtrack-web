import ProfileLayout from '@/layouts/profile_layout';
import styles from '@/styles/pages/user/profile.module.sass';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { UserPage } from '@/components/profile_nav';
import { useRouter } from 'next/router';
import RecentlyPlayed from '@/components/user/recently_played';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/loading_spinner';
import {
  TopAlbum,
  TopArtist,
  TopTrack,
  RecentlyPlayedTrack,
  TopItemView,
  TopItemTimeframe
} from '@/utils/types';
import TopItems, { TopItemTypes } from '@/components/top_items';

type ProfileResponse = {
  recentTracks: RecentlyPlayedTrack[];
  tracks: TopTrack[];
  albums: TopAlbum[];
  artists: TopArtist[];
  topTracksStyle: TopItemView;
  topTracksTimeframe: TopItemTimeframe;
  topAlbumsStyle: TopItemView;
  topAlbumsTimeframe: TopItemTimeframe;
  topArtistsStyle: TopItemView;
  topArtistsTimeframe: TopItemTimeframe;
};

/**
 * User Profile page.
 */
const Profile: NextPageWithLayout = () => {
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const { isLoading, error, data } = useFetch<ProfileResponse>(url);

  useEffect(() => {
    if (router.query.user !== undefined) {
      setUrl(
        `http://localhost:8000/api/users/${router.query.user as string}/profile`
      );
    }
  }, [router.query.user]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

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
    <div className={styles['overview']}>
      {data && (
        <>
          <RecentlyPlayed itemList={data.recentTracks} />
          <TopItems
            itemList={data.tracks}
            itemType={TopItemTypes.TRACK}
            defaultView={data.topTracksStyle}
            defaultTimeframe={data.topTracksTimeframe}
          />
          <TopItems
            itemList={data.albums}
            itemType={TopItemTypes.ALBUM}
            defaultView={data.topAlbumsStyle}
            defaultTimeframe={data.topAlbumsTimeframe}
          />
          <TopItems
            itemList={data.artists}
            itemType={TopItemTypes.ARTIST}
            defaultView={data.topArtistsStyle}
            defaultTimeframe={data.topArtistsTimeframe}
          />
        </>
      )}
      <h2>Top Genres</h2>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout page={UserPage.PROFILE}>{page}</ProfileLayout>;
};

export default Profile;
