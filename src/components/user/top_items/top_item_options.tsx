import styles from '@/styles/components/user/top_items/top_item_options.module.sass';
import { StyleType, Timeframe } from '@/pages/settings/profile';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Grid from '@/assets/icons/grid.svg';
import GridActive from '@/assets/icons/grid_active.svg';
import List from '@/assets/icons/list.svg';
import ListActive from '@/assets/icons/list_active.svg';
import Graph from '@/assets/icons/graph.svg';
import GraphActive from '@/assets/icons/graph_active.svg';
import useWindowSize from '@/hooks/useWindowSize';

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
  const { width } = useWindowSize();

  /**
   * When the screen width is 800px or less the chart option is not available,
   * so switch to the list style.
   */
  useEffect(() => {
    if (width === 0) return;
    if (width <= 800) {
      if (style === StyleType.CHART) {
        setStyle(StyleType.LIST);
      }
    }
  }, [width, style, setStyle]);

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
      <>
        <button
          onClick={() => setStyle(StyleType.GRID)}
          className={styles['style-btn']}
        >
          <Image
            src={style === StyleType.GRID ? GridActive : Grid}
            alt="Grid Icon"
            width={16}
            height={16}
          ></Image>
        </button>
        <button
          onClick={() => setStyle(StyleType.LIST)}
          className={styles['style-btn']}
        >
          <Image
            src={style === StyleType.LIST ? ListActive : List}
            alt="List Icon"
            width={16}
            height={16}
          ></Image>
        </button>
        {width > 800 && (
          <button
            onClick={() => setStyle(StyleType.CHART)}
            className={styles['style-btn']}
          >
            <Image
              src={style === StyleType.CHART ? GraphActive : Graph}
              alt="Graph Icon"
              width={16}
              height={16}
            ></Image>
          </button>
        )}
      </>
    </div>
  );
};

export default TopItemOptions;
