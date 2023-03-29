import styles from '@/styles/components/image_bar_chart.module.sass';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js';

const addImage = (chart: any) => {
  let imgs = chart.config.options.plugins.addImageLabels;
  var ctx = chart.ctx;
  var xAxis = chart.scales['x'];
  var yAxis = chart.scales['y'];
  // Calculate width of image
  const width = (xAxis.width / 10) * 0.75;
  xAxis.ticks.forEach((value: any, index: number) => {
    var x = xAxis.getPixelForTick(index);
    ctx.drawImage(imgs[index], x - width / 2, yAxis.bottom + 10, width, width);
  });
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, {
  id: 'addImageLabels',
  afterDatasetsDraw: addImage
});

type ImageBarChartProps = {
  labels: string[];
  images: string[];
  data: number[];
};

/**
 * Component to display a bar chart with images labels along the x-axis.
 * @param data Data to display in the bar chart.
 * @param labels Labels to display in the tooltip.
 * @param images Images to display on the x-axis.
 */
const ImageBarChart = ({ data, labels, images }: ImageBarChartProps) => {
  // Bar chart options
  const options = {
    responsive: true,
    plugins: {
      // Add images to labels on x-axis
      addImageLabels: images.map((image) => {
        const img = document.createElement('img');
        img.src = image;
        return img;
      }),
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          // Add label to tooltip as image is displayed on the x-axis instead of text
          title: (tooltipItem: any) => {
            return labels[tooltipItem[0].dataIndex];
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

  // Bar chart data
  const chartData = {
    // Set labels to empty strings as images are used instead
    labels: Array.from({ length: 10 }).map((_) => ''),
    datasets: [
      {
        label: 'Streams',
        data: data,
        fill: false,
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(133, 99, 132, 0.5)']
      }
    ]
  };

  return (
    <div className={styles['graph']}>
      <Bar options={options as any} data={chartData} />
    </div>
  );
};

export default ImageBarChart;