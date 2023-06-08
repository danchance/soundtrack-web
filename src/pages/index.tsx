import Head from 'next/head';
import styles from '@/styles/pages/home.module.sass';
import Image from 'next/image';
import BackgroundImage from '@/assets/images/main-background.jpg';

const Home = () => {
  return (
    <>
      <Head>
        <title>soundTrack</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles['container']}>
        <div className={styles['hero-img']}>
          <Image src={BackgroundImage} alt="" fill priority={true}></Image>
        </div>
        <div className={styles['wrapper']}>
          <div className={styles['test']}>this is test content</div>
          <h1>hello?</h1>
          <h1>hello?</h1>
          <h1>hello?</h1>
          <h1>hello?</h1>
          <h1>hello?</h1>
          <h1>hello?</h1>
          <h1>hello?</h1>
        </div>
      </main>
    </>
  );
};

export default Home;
