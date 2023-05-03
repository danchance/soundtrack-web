import { useState } from 'react';
import styles from '@/styles/components/user/top_items/top_item_display.module.sass';
import Link from 'next/link';
import TopItemBarChart from './top_item_bar_chart';
import TopItemsOptions from './top_item_options';
import { StyleType, Timeframe } from '@/pages/settings/profile';
import TopItemGrid from './top_item_grid';
import TopItemList from './top_item_list';

type TopItemDisplayProps = {
  itemList: Array<Item>;
  itemType: TopItemTypes;
  defaultView: StyleType;
  defaultTimeframe: Timeframe;
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

/**
 * Component used to display either a users top tracks, albums or artists.
 * Items can be viewed in a list, grid or chart and can be filtered by timeframe.
 * @param itemList The list of items to display.
 * @param itemType The type of item we are displaying.
 * @returns
 */
const TopItemDisplay = ({
  itemList,
  itemType,
  defaultView,
  defaultTimeframe
}: TopItemDisplayProps) => {
  const [timeframe, setTimeframe] = useState<Timeframe>(defaultTimeframe);
  const [style, setStyle] = useState<StyleType>(defaultView);
  const heading = `Top ${itemType}s`.toUpperCase();

  /**
   * Get the images, labels and data for the bar chart view.
   */
  const images = itemList.map((item) => item.artwork);
  const labels = itemList.map((item) => {
    if (itemType === TopItemTypes.TRACK) {
      return item.trackName;
    } else if (itemType === TopItemTypes.ALBUM) {
      return item.albumName;
    } else {
      return item.artistName;
    }
  }) as string[];
  const data = itemList.map((item) => item.count);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h2>{heading}</h2>
        <TopItemsOptions
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
        <TopItemList itemList={itemList} itemType={itemType} />
      )}
      {style === StyleType.CHART && (
        <TopItemBarChart data={data} labels={labels} images={images} />
      )}
      <div className={styles['footer']}>
        <Link href="#">View All</Link>
      </div>
    </div>
  );
};

export default TopItemDisplay;
