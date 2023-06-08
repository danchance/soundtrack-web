import styles from '@/styles/components/image_slider.module.sass';
import Image, { StaticImageData } from 'next/image';

type ImageSliderProps = {
  images: StaticImageData[];
  imageSize: number;
  speed: number;
};

/**
 * @param images List of images for the slider to display.
 * @param imageSize Width/height (in px) to display the images.
 * @param speed Scroll speed (pixels per frame at 60 frames per second).
 */
const ImageSlider = ({ images, imageSize, speed }: ImageSliderProps) => {
  return (
    <div className={styles['container']}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt=""
          width={imageSize}
          height={imageSize}
          className={styles['image']}
        ></Image>
      ))}
    </div>
  );
};

export default ImageSlider;
