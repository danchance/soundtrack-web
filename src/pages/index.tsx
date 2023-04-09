import Head from 'next/head';
import styles from '@/styles/pages/Home.module.sass';
import { ReactElement } from 'react';

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
        <div className={styles['curved']}>
          <h1>Connect with Spotify to get started</h1>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#f3f4f5"
                fillOpacity="1"
                d="M0,32L60,53.3C120,75,240,117,360,149.3C480,181,600,203,720,224C840,245,960,267,1080,266.7C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#f3f4f5"
              fillOpacity="1"
              d="M0,96L60,128C120,160,240,224,360,261.3C480,299,600,309,720,314.7C840,320,960,320,1080,277.3C1200,235,1320,149,1380,106.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className={styles['content']}>this is more content</div>
      </main>
    </>
  );
};

export default Home;
