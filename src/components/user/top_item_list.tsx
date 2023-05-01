import { useState } from 'react';
import styles from '@/styles/components/user/top_item_list.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import GridSVG from '@/assets/icons/grid.svg';
import ListSVG from '@/assets/icons/list.svg';
import GraphSVG from '@/assets/icons/graph.svg';
import ImageBarChart from '../image_bar_chart';
import { TopItemTimeframe, TopItemView } from '@/utils/types';
import GoldMedal from '@/assets/icons/gold.png';
import SilverMedal from '@/assets/icons/silver.png';
import BronzeMedal from '@/assets/icons/bronze.png';

type TopItemListProps = {
  itemList: Array<Item>;
  itemType: TopItemTypes;
  defaultView: TopItemView;
  defaultTimeframe: TopItemTimeframe;
};

type Item = {
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
 * @param itemList The list of items to display.
 * @param itemType The type of item we are displaying.
 * @returns
 */
const TopItemList = ({
  itemList,
  itemType,
  defaultView,
  defaultTimeframe
}: TopItemListProps) => {
  const [view, setView] = useState<TopItemView>(defaultView);
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
        <div className={styles['options']}>
          <button onClick={() => setView(TopItemView.GRID)}>
            <Image src={GridSVG} alt="Grid Icon" width={16} height={16}></Image>
          </button>
          <button onClick={() => setView(TopItemView.LIST)}>
            <Image src={ListSVG} alt="List Icon" width={16} height={16}></Image>
          </button>
          <button onClick={() => setView(TopItemView.CHART)}>
            <Image
              src={GraphSVG}
              alt="Graph Icon"
              width={16}
              height={16}
            ></Image>
          </button>
        </div>
      </div>
      {view === TopItemView.GRID && (
        <div className={styles['grid']}>
          {itemList.map((item) => (
            <div className={styles['item']} key={item.id}>
              <Link
                href={
                  itemType === TopItemTypes.TRACK
                    ? `/library/${item.artistSlug}/${item.albumSlug}/${item.trackSlug}`
                    : itemType === TopItemTypes.ALBUM
                    ? `/library/${item.artistSlug}/${item.albumSlug}`
                    : `/library/${item.artistSlug}`
                }
                className={styles['artwork']}
              >
                <Image
                  src={item.artwork}
                  alt={`${itemType} artwork`}
                  fill
                ></Image>
              </Link>

              <div className={styles['info']}>
                {itemType === TopItemTypes.ALBUM && (
                  <>
                    <h3 className={styles['album-name']}>
                      <Link
                        href={`/library/${item.artistSlug}/${item.albumSlug}`}
                      >
                        {item.albumName}
                      </Link>
                    </h3>
                    <h4 className={styles['artist-name']}>
                      <Link href={`/library/${item.artistSlug}`}>
                        {item.artistName}
                      </Link>
                    </h4>
                  </>
                )}
                {itemType === TopItemTypes.TRACK && (
                  <>
                    <h3 className={styles['track-name']}>
                      <Link
                        href={`/library/${item.artistSlug}/${item.albumSlug}/${item.trackSlug}`}
                      >
                        {item.trackName}
                      </Link>
                    </h3>
                    <h4 className={styles['artist-name']}>
                      <Link href={`/library/${item.artistSlug}`}>
                        {item.artistName}
                      </Link>
                    </h4>
                  </>
                )}
                {itemType === TopItemTypes.ARTIST && (
                  <h3 className={styles['artist-name']}>
                    <Link href={`/library/${item.artistSlug}`}>
                      {item.artistName}
                    </Link>
                  </h3>
                )}
                <h4 className={styles['count']}>
                  <Link href="#">{item.count} streams</Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
      {view === TopItemView.LIST && (
        <table className={styles['list']}>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={item.id}>
                <td className={styles['rank-col']}>
                  {index <= 2 && (
                    <Image
                      src={
                        index === 0
                          ? GoldMedal
                          : index === 1
                          ? SilverMedal
                          : BronzeMedal
                      }
                      alt={(index + 1).toString()}
                      width={30}
                      height={30}
                    ></Image>
                  )}
                  {index > 2 && index + 1}
                </td>
                <td className={styles['artwork-col']}>
                  <Link href="#">
                    <Image
                      className={styles['artwork']}
                      src={item.artwork}
                      alt={`${itemType} artwork`}
                      width={40}
                      height={40}
                    ></Image>
                  </Link>
                </td>
                <td className={styles['info-col']}>
                  {itemType === TopItemTypes.TRACK && (
                    <Link
                      href={`/library/${item.artistSlug}/${item.albumSlug}/${item.trackSlug}`}
                    >
                      {item.trackName}
                    </Link>
                  )}
                  {itemType === TopItemTypes.ALBUM && (
                    <Link
                      href={`/library/${item.artistSlug}/${item.albumSlug}`}
                    >
                      {item.albumName}
                    </Link>
                  )}
                  <Link href={`/library/${item.artistSlug}`}>
                    {item.artistName}
                  </Link>
                </td>
                <td className={styles['count-col']}>
                  <Link href="#">{`${item.count} streams`}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {view === TopItemView.CHART && (
        <ImageBarChart data={data} labels={labels} images={images} />
      )}
      <div className={styles['footer']}>
        <Link href="#">View All</Link>
      </div>
    </div>
  );
};

export default TopItemList;
