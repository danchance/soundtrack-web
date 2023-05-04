import styles from '@/styles/components/user/top_items/top_item_options.module.sass';
import { StyleType, Timeframe } from '@/pages/settings/profile';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import GridSVG from '@/assets/icons/grid.svg';
import ListSVG from '@/assets/icons/list.svg';
import GraphSVG from '@/assets/icons/graph.svg';

type TimeframeProps = {
  timeframe: Timeframe;
  setTimeframe: Dispatch<SetStateAction<Timeframe>>;
  style: StyleType;
  setStyle: Dispatch<SetStateAction<StyleType | undefined>>;
};

/**
 * Options for the top items component. Used to select the timeframe and
 * display style.
 * @param timeframe The timeframe to display.
 * @param setTimeframe The function to set the timeframe.
 * @param style The style to display.
 * @param setStyle The function to set the style.
 */
const TopItemOptions = ({
  timeframe,
  setTimeframe,
  style,
  setStyle
}: TimeframeProps) => {
  return (
    <div className={styles['container']}>
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
      <button
        onClick={() => setStyle(StyleType.GRID)}
        className={styles['style-btn']}
      >
        <Image src={GridSVG} alt="Grid Icon" width={16} height={16}></Image>
      </button>
      <button
        onClick={() => setStyle(StyleType.LIST)}
        className={styles['style-btn']}
      >
        <Image src={ListSVG} alt="List Icon" width={16} height={16}></Image>
      </button>
      <button
        onClick={() => setStyle(StyleType.CHART)}
        className={styles['style-btn']}
      >
        <Image src={GraphSVG} alt="Graph Icon" width={16} height={16}></Image>
      </button>
    </div>
  );
};

export default TopItemOptions;
