import { useEffect, useState } from 'react';
import styles from '@/styles/components/top_items.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import GridSVG from '@/assets/icons/grid.svg';
import ListSVG from '@/assets/icons/list.svg';
import GraphSVG from '@/assets/icons/graph.svg';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, {
  id: 'addImageLabels',
  afterDatasetsDraw: (chart: any) => {
    let imgs = chart.config.options.plugins.addImageLabels;
    var ctx = chart.ctx;
    var xAxis = chart.scales['x'];
    var yAxis = chart.scales['y'];
    const width = (xAxis.width / 10) * 0.75;
    xAxis.ticks.forEach((value: any, index: number) => {
      var x = xAxis.getPixelForTick(index);
      ctx.drawImage(
        imgs[index],
        x - width / 2,
        yAxis.bottom + 10,
        width,
        width
      );
    });
  }
});

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
  const [view, setView] = useState<View>(View.GRAPH);
  // Set correct heading based on item type we are displaying.
  const heading = `Top ${itemType}s`;

  const images = itemList.map((item) => {
    const img = document.createElement('img');
    img.src = item.artwork;
    return img;
  });

  const options = {
    responsive: true,
    plugins: {
      addImageLabels: images,
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem: any) => {
            const index = tooltipItem[0].dataIndex;
            if (itemType === TopItemTypes.TRACK) {
              return itemList[index].trackName;
            }
            if (itemType === TopItemTypes.ALBUM) {
              return itemList[index].albumName;
            }
            if (itemType === TopItemTypes.ARTIST) {
              return itemList[index].artistName;
            }
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true
        }
      },
      x: {
        ticks: {
          padding: 30
        }
      }
    }
  };

  const data = {
    labels: Array.from({ length: 10 }).map((_) => ''),
    datasets: [
      {
        label: 'Streams',
        data: itemList.map((item) => item.count),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };

  return (
    <div className={styles['top-items']}>
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
      {view === View.GRAPH && (
        <div className={styles['graph']}>
          <Bar options={options as any} data={data} />
        </div>
      )}
      <div className={styles['footer']}>
        <Link href="#">View All</Link>
      </div>
    </div>
  );
};

export default TopItems;
