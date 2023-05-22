import { Timeframe } from '@/pages/settings/profile';
import styles from '@/styles/components/user/view_all_list.module.sass';
import { useEffect, useState } from 'react';
import TopItemList from './top_items/top_item_list';
import {
  Item,
  TopItemResponse,
  TopItemTypes
} from './top_items/top_item_display';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';

type ViewAllListProps = {
  username: string;
  itemType: TopItemTypes;
};

/**
 *
 * @param username The username of the user we are displaying the items for.
 * @param itemType The type of item we are displaying.
 */
const ViewAllList = ({ username, itemType }: ViewAllListProps) => {
  const heading = `All ${itemType}s`.toUpperCase();
  const baseUrl = `http://localhost:8000/api/users/${username}/${itemType.toLowerCase()}s?limit=20`;
  const [url, setUrl] = useState<string>(baseUrl);
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.ALL);
  const { data, error } = useFetch<TopItemResponse>(url, true);
  const [itemList, setItemList] = useState<Array<Item>>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const router = useRouter();

  /**
   * Set the list of items and timeframe when new data is fetched.
   */
  useEffect(() => {
    if (data) {
      console.log(data);
      if (itemType === TopItemTypes.TRACK) setItemList(data.tracks!);
      if (itemType === TopItemTypes.ALBUM) setItemList(data.albums!);
      if (itemType === TopItemTypes.ARTIST) setItemList(data.artists!);
      setTimeframe(data.timeframe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, itemType]);

  /**
   * When the timeframe or page number is updated, update the url query parameters,
   * to trigger a fetch of the new data.
   */
  useEffect(() => {
    if (!data) return;
    setUrl(`${baseUrl}&timeframe=${timeframe}&page=${pageNumber}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe, pageNumber]);

  if (error) {
    router.push('/500');
  }

  if (!data) return <></>;

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h2>{heading}</h2>
        <select
          name="timeframe"
          value={timeframe}
          onChange={(e) => {
            setTimeframe(e.target.value as Timeframe);
          }}
          className={styles['timeframe-select']}
        >
          <option value={Timeframe.WEEK}>Week</option>
          <option value={Timeframe.MONTH}>Month</option>
          <option value={Timeframe.YEAR}>Year</option>
          <option value={Timeframe.ALL}>All Time</option>
        </select>
      </div>
      <TopItemList itemList={itemList} itemType={itemType} />
      <div className={styles['footer']}>
        <button onClick={() => setPageNumber(pageNumber - 1)}>-</button>
        <input value={pageNumber}></input>
        <button onClick={() => setPageNumber(pageNumber + 1)}>+</button>
      </div>
    </div>
  );
};

export default ViewAllList;
