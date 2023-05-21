import styles from '@/styles/components/user/top_items/top_item_list.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import GoldMedal from '@/assets/icons/gold.png';
import SilverMedal from '@/assets/icons/silver.png';
import BronzeMedal from '@/assets/icons/bronze.png';
import { Item, TopItemTypes } from './top_item_display';

type TopItemListProps = {
  itemList: Array<Item>;
  itemType: TopItemTypes;
};

const TopItemList = ({ itemList, itemType }: TopItemListProps) => {
  return (
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
                <Link href={`/library/${item.artistSlug}/${item.albumSlug}`}>
                  {item.albumName}
                </Link>
              )}
              <Link href={`/library/${item.artistSlug}`}>
                {item.artistName}
              </Link>
            </td>
            <td className={styles['count-col']}>
              <Link href="#">
                {`${item.count} `}
                <span>streams</span>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopItemList;
