import { useState } from 'react';
import styles from '@/styles/components/top_items.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import GridSVG from '@/assets/icons/grid.svg';
import ListSVG from '@/assets/icons/list.svg';
import GraphSVG from '@/assets/icons/graph.svg';

type TopItemsProps = {
  itemList: Array<Item>;
  itemType: TopItemTypes;
};

type Item = {
  id: string;
  artistName: string;
  artwork: string;
  count: number;
  trackName?: string;
  albumName?: string;
};

export enum TopItemTypes {
  TRACK = 'Track',
  ALBUM = 'Album',
  ARTIST = 'Artist'
}

enum View {
  LIST = 0,
  GRID = 1,
  GRAPH = 2
}

/**
 * Component used to display either a users top tracks, albums or artists.
 * @param itemList The list of items to display.
 * @param itemType The type of item we are displaying.
 * @returns
 */
const TopItems = ({ itemList, itemType }: TopItemsProps) => {
  const [view, setView] = useState<View>(View.GRID);
  // Set correct heading based on item type we are displaying.
  const heading = `Top ${itemType}s`;

  return (
    <>
      <div className={styles['header']}>
        <h2>{heading}</h2>
        <div className={styles['options']}>
          <button onClick={() => setView(View.GRID)}>
            <Image src={GridSVG} alt="Grid Icon" width={16} height={16}></Image>
          </button>
          <button onClick={() => setView(View.LIST)}>
            <Image src={ListSVG} alt="List Icon" width={16} height={16}></Image>
          </button>
          <button onClick={() => setView(View.GRAPH)}>
            <Image
              src={GraphSVG}
              alt="Graph Icon"
              width={16}
              height={16}
            ></Image>
          </button>
        </div>
      </div>
      {view === View.GRID && (
        <div className={styles['grid']}>
          {itemList.map((item) => (
            <div className={styles['item']} key={item.id}>
              <Link href="#" className={styles['artwork']}>
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
                      <Link href="#">{item.albumName}</Link>
                    </h3>
                    <h4 className={styles['artist-name']}>
                      <Link href="#">{item.artistName}</Link>
                    </h4>
                  </>
                )}
                {itemType === TopItemTypes.TRACK && (
                  <>
                    <h3 className={styles['track-name']}>
                      <Link href="#">{item.trackName}</Link>
                    </h3>
                    <h4 className={styles['artist-name']}>
                      <Link href="#">{item.artistName}</Link>
                    </h4>
                  </>
                )}
                {itemType === TopItemTypes.ARTIST && (
                  <h3 className={styles['artist-name']}>
                    <Link href="#">{item.artistName}</Link>
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
      <div className={styles['footer']}>
        <button>View All</button>
      </div>
    </>
  );
};

export default TopItems;