import styles from '@/styles/components/image_slider.module.sass';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';

type ImageSliderProps = {
  images: StaticImageData[];
};

/**
 * Horizontal scrolling image banner. Enough images must be supplied to overflow
 * the container size.
 * @param images List of images for the slider to display.
 */
const ImageSlider = ({ images }: ImageSliderProps) => {
  const sliderContainer = useRef<HTMLDivElement | null>(null);
  const [imagePositions, setImagePositions] = useState<number[]>([]);
  const IMAGE_SIZE = 200;
  const IMAGE_SPACING = 20;

  /**
   * Animation function. Updates the position of each image in the array.
   * Images that are offscreen are wrapped around to the start
   */
  const animate = () => {
    setImagePositions((prevPositions) =>
      prevPositions.map((position) => {
        let newPosition = position + 0.5;
        // Image is fully off-screen, wrap around to the start
        if (newPosition > (images.length - 1) * (IMAGE_SIZE + IMAGE_SPACING)) {
          const firstPosition = -IMAGE_SIZE - IMAGE_SPACING;
          newPosition = firstPosition;
        }
        return newPosition;
      })
    );
    console.log('animate');
    requestAnimationFrame(animate);
  };

  /**
   * Sets initial position of each image, and triggers the start of the animation.
   */
  useEffect(() => {
    const initialPositions = images.map(
      (_, index) => index * (IMAGE_SIZE + IMAGE_SPACING)
    );
    setImagePositions(initialPositions);

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={sliderContainer} className={styles['container']}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt=""
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className={styles['image']}
          style={{ left: imagePositions[index] }}
        ></Image>
      ))}
    </div>
  );
};

export default ImageSlider;
