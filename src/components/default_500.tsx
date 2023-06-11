import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/default_error.module.sass';
import ErrorImage from '@/assets/images/500.png';
import Head from 'next/head';

/**
 * Default 500 Server Error page.
 */
const Default500 = () => {
  return (
    <>
      <Head>
        <title>soundTrack | Something Went Wrong</title>
      </Head>
      <div className={styles['nav-background']}></div>
      <div className={[styles['error'], styles['server']].join(' ')}>
        <div className={styles['error-info']}>
          <h1>Oops, looks like something went wrong.</h1>
          <p className={styles['desc']}>Please try again later.</p>
          <Link href="/" className={styles['home-btn']}>
            BACK TO HOMEPAGE
          </Link>
        </div>

        <div className={[styles['error-img'], styles['server']].join(' ')}>
          <Image
            src={ErrorImage}
            alt="server error"
            width={300}
            height={300}
          ></Image>
        </div>
      </div>
    </>
  );
};

export default Default500;
