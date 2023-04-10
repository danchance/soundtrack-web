import Head from 'next/head';
import styles from '@/styles/pages/Home.module.sass';
import Background from '@/assets/images/backgroundv4.svg';
import Image from 'next/image';

const Home = () => {
  return (
    <>
      <Head>
        <title>soundTrack</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles['hero']}>
          <Image
            src={Background}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            className={styles['hero-img']}
            draggable={false}
          ></Image>
          <section className={styles['hero-content']}>
            <h1 className={styles['heading']}>soundTrack</h1>
            <button>Get Started</button>
          </section>
        </div>
        <section className={styles['test']}>
          <div className={styles['test2']}>
            <h1>hello</h1>
          </div>
          <div className={styles['test2']}></div>
        </section>
        <section className={styles['test3']}>
          <h1>test3</h1>
        </section>
      </main>
    </>
  );
};

export default Home;
