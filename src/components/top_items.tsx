import { useState } from 'react';
import styles from '@/styles/components/top_items.module.sass';
import Image from 'next/image';
import Link from 'next/link';

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
 * @param user The username of the user to display.
 * @param item The type of item to display.
 * @returns
 */
const TopItems = ({ itemList, itemType }: TopItemsProps) => {
  const [view, setView] = useState<View>(View.LIST);
  // Set correct heading based on item type we are displaying.
  const heading = `Top ${itemType}s`;

  console.log(itemList);

  const header = (
    <div className={styles['header']}>
      <h2>{heading}</h2>
      <div className={styles['options']}>
        <button onClick={() => setView(View.GRID)}>Grid</button>
        <button onClick={() => setView(View.LIST)}>List</button>
        <button onClick={() => setView(View.GRAPH)}>Graph</button>
      </div>
    </div>
  );
  return (
    <>
      <div className={styles['header']}>
        <h2>{heading}</h2>
        <div className={styles['options']}>
          <button onClick={() => setView(View.GRID)}>Grid</button>
          <button onClick={() => setView(View.LIST)}>List</button>
          <button onClick={() => setView(View.GRAPH)}>Graph</button>
        </div>
      </div>
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
                <h3>
                  <Link href="#">{item.albumName}</Link>
                </h3>
              )}
              {itemType === TopItemTypes.TRACK && (
                <h3>
                  <Link href="#">{item.trackName}</Link>
                </h3>
              )}
              <h4>
                <Link href="#">{item.artistName}</Link>
              </h4>
              <h4>
                <Link href="#">{item.count} streams</Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopItems;
