import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/default_404.module.sass';
import NotFoundImage from '@/assets/images/404.svg';

/**
 * Default 404 page.
 * @returns
 */
const Default404 = () => {
  return (
    <>
      <div className={styles['nav-background']}></div>
      <div className={styles['error']}>
        <div className={styles['error-info']}>
          <h1>{"It's Empty Here"}</h1>
          <p className={styles['desc']}>
            {
              "Looks like this page can't be found. Maybe it was moved or renamed"
            }
          </p>
          <Link href="/" className={styles['home-btn']}>
            BACK TO HOMEPAGE
          </Link>
        </div>
        <div className={styles['error-img']}>
          <Image src={NotFoundImage} alt="page not found" fill></Image>
        </div>
      </div>
    </>
  );
};

export default Default404;
