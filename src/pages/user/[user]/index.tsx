import ProfileLayout from '@/components/profile_layout';
import styles from '@/styles/pages/user/profile.module.sass';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { UserPage } from '@/components/profile_nav';
import { useRouter } from 'next/router';
import RecentlyPlayed from '@/components/recently_played';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/loading_spinner';
import {
  TopAlbum,
  TopArtist,
  TopTrack,
  RecentlyPlayedTrack
} from '@/utils/types';
import TopItems, { TopItemTypes } from '@/components/top_items';

type ProfileResponse = {
  recentTracks: RecentlyPlayedTrack[];
  tracks: TopTrack[];
  albums: TopAlbum[];
  artists: TopArtist[];
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
          <RecentlyPlayed trackList={data.recentTracks} />
          <TopItems itemList={data.tracks} itemType={TopItemTypes.TRACK} />
          <TopItems itemList={data.albums} itemType={TopItemTypes.ALBUM} />
          <TopItems itemList={data.artists} itemType={TopItemTypes.ARTIST} />
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
