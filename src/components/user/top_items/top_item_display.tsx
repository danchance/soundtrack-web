import { useEffect, useState } from 'react';
import styles from '@/styles/components/user/top_items/top_item_display.module.sass';
import Link from 'next/link';
import TopItemBarChart from './top_item_bar_chart';
import TopItemOptions from './top_item_options';
import { StyleType, Timeframe } from '@/pages/settings/profile';
import TopItemGrid from './top_item_grid';
import TopItemList from './top_item_list';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/router';

type TopItemDisplayProps = {
  username: string;
  itemType: TopItemTypes;
};

export type Item = {
  id: string;
  artistName: string;
  artwork: string;
  count: number;
  trackName?: string;
  albumName?: string;
  trackSlug?: string;
  albumSlug?: string;
  artistSlug: string;
};

export enum TopItemTypes {
  TRACK = 'Track',
  ALBUM = 'Album',
  ARTIST = 'Artist'
}

export type TopItemResponse = {
  tracks?: Array<Item>;
  albums?: Array<Item>;
  artists?: Array<Item>;
  timeframe: Timeframe;
  style: StyleType;
  total: number;
};

/**
 * Component used to display either a users top tracks, albums or artists.
 * Items can be viewed in a list, grid or chart and can be filtered by timeframe.
 * @param username The username of the user we are displaying the items for.
 * @param itemType The type of item we are displaying.
 * @returns
 */
const TopItemDisplay = ({ username, itemType }: TopItemDisplayProps) => {
  const heading = `Top ${itemType}s`.toUpperCase();
  const baseUrl = `http://localhost:8000/api/users/${username}/${itemType.toLowerCase()}s`;
  const [url, setUrl] = useState<string>(baseUrl);
  const { data, error } = useFetch<TopItemResponse>(url, true);
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.ALL);
  const [style, setStyle] = useState<StyleType>();
  const [itemList, setItemList] = useState<Array<Item>>([]);
  const router = useRouter();

  /**
   * Set the list of items, timeframe and style when new data is fetched.
   * Style is only updated when data is first fetched.
   */
  useEffect(() => {
    if (data) {
      if (itemType === TopItemTypes.TRACK) setItemList(data.tracks!);
      if (itemType === TopItemTypes.ALBUM) setItemList(data.albums!);
      if (itemType === TopItemTypes.ARTIST) setItemList(data.artists!);
      if (style === undefined) setStyle(data.style);
      setTimeframe(data.timeframe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, itemType]);

  /**
   * When the timeframe is changed update the API URL, which will trigger a
   * re-fetch of the data for the new timeframe.
   */
  useEffect(() => {
    if (!data) return;
    if (timeframe === data.timeframe) return;
    setUrl(`${baseUrl}?timeframe=${timeframe}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe]);

  if (error) {
    router.push('/500');
  }

  if (!data || style === undefined) return <></>;

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h2>{heading}</h2>
        <TopItemOptions
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          style={style}
          setStyle={setStyle}
        />
      </div>
      {style === StyleType.GRID && (
        <TopItemGrid itemList={itemList} itemType={itemType} />
      )}
      {style === StyleType.LIST && (
        <TopItemList
          itemList={itemList}
          itemType={itemType}
          pageNumber={1}
          limit={10}
        />
      )}
      {style === StyleType.CHART && (
        <TopItemBarChart itemList={itemList} itemType={itemType} />
      )}
      <div className={styles['footer']}>
        <Link
          href={
            itemType === TopItemTypes.TRACK
              ? `/user/${username}/tracks`
              : itemType === TopItemTypes.ALBUM
              ? `/user/${username}/albums`
              : `/user/${username}/artists`
          }
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default TopItemDisplay;
