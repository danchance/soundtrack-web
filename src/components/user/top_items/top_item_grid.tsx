import styles from '@/styles/components/user/top_items/top_item_grid.module.sass';
import Link from 'next/link';
import { Item, TopItemTypes } from './top_item_display';
import Image from 'next/image';

type TopItemGridProps = {
  itemList: Array<Item>;
  itemType: TopItemTypes;
};

/**
 * Component builds the grid view for a users top tracks, albums or artists.
 * @param itemList The items to display.
 * @param itemType The type of item we are displaying (track, album or artist).
 * @returns
 */
const TopItemGrid = ({ itemList, itemType }: TopItemGridProps) => {
  return (
    <div className={styles['container']}>
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
              sizes="250px"
            ></Image>
          </Link>
          <div className={styles['info']}>
            {itemType === TopItemTypes.ALBUM && (
              <>
                <h3 className={styles['album-name']}>
                  <Link href={`/library/${item.artistSlug}/${item.albumSlug}`}>
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
  );
};

export default TopItemGrid;
