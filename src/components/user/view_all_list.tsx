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
import PageNumberNav from '../page_number_nav';
import LoadingSpinner from '../loading_spinner';

type ViewAllListProps = {
  username: string;
  itemType: TopItemTypes;
  pageSize: number;
};

/**
 * Displays a list
 * @param username The username of the user we are displaying the items for.
 * @param itemType The type of item we are displaying.
 */
const ViewAllList = ({ username, itemType, pageSize }: ViewAllListProps) => {
  const heading = `All ${itemType}s`.toUpperCase();
  const baseUrl = `${
    process.env.NEXT_PUBLIC_SOUNDTRACK_API
  }/users/${username}/${itemType.toLowerCase()}s?limit=${pageSize}`;
  const [url, setUrl] = useState<string>(baseUrl);
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.ALL);
  const { isLoading, data, error } = useFetch<TopItemResponse>(url, true);
  const [itemList, setItemList] = useState<Array<Item>>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      setItemList([]);
    }
  }, [isLoading]);

  /**
   * Set the list of items and timeframe when new data is fetched.
   */
  useEffect(() => {
    if (data) {
      if (itemType === TopItemTypes.TRACK) setItemList(data.tracks!);
      if (itemType === TopItemTypes.ALBUM) setItemList(data.albums!);
      if (itemType === TopItemTypes.ARTIST) setItemList(data.artists!);
      setTimeframe(data.timeframe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, itemType]);

  /**
   * When the page number is updated, update the url, to trigger a fetch of the
   * new page of data.
   */
  useEffect(() => {
    if (!data) return;
    setUrl(`${baseUrl}&timeframe=${timeframe}&page=${pageNumber}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  /**
   * When the timeframe is updated, reset the page number to 1 and update the
   * url to trigger a fetch of the new data.
   */
  useEffect(() => {
    if (!data) return;
    setPageNumber(1);
    setUrl(`${baseUrl}&timeframe=${timeframe}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe]);

  if (error) {
    router.push('/500');
  }

  if (!data) return <></>;

  return (
    <div className={styles['container']}>
      <div className={styles['header']} id="view-all-header">
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
      {isLoading && (
        <div className={styles['spinner']}>
          <LoadingSpinner size={2.5} weight={4} />
        </div>
      )}
      <TopItemList
        itemList={itemList}
        itemType={itemType}
        pageNumber={pageNumber}
        limit={pageSize}
      />
      <div className={styles['footer']}>
        <PageNumberNav
          currentPage={pageNumber}
          maxPages={Math.ceil(data.total / pageSize)}
          setCurrentPage={setPageNumber}
        />
      </div>
    </div>
  );
};

export default ViewAllList;
