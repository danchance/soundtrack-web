import Head from 'next/head';
import styles from '@/styles/pages/home.module.sass';
import Image from 'next/image';
import BackgroundImage from '@/assets/images/main-background.jpg';
import DemoImage from '@/assets/images/demo1.jpg';
import DemoImage2 from '@/assets/images/demo2.jpg';
import ImageSlider from '@/components/image_slider';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { loginWithRedirect } = useAuth0();

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
        <div className={styles['section1']}>
          <p>Connect with Spotify to start tracking your streams.</p>
          <button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: { screen_hint: 'signup' }
              })
            }
          >
            GET STARTED
          </button>
        </div>
        <div className={styles['section2']}>
          <div className={styles['wrapper']}>
            <div className={styles['image-container']}>
              <Image src={DemoImage} alt="" fill></Image>
            </div>

            <div className={styles['text-container']}>content here</div>
          </div>
        </div>
        <div className={styles['section3']}>
          <div className={styles['text-container']}>content here</div>
          <div className={styles['image-container']}>
            <Image src={DemoImage2} alt="" fill></Image>
          </div>
        </div>
        <div className={styles['slider-container']}>
          <ImageSlider
            images={[
              BackgroundImage,
              BackgroundImage,
              BackgroundImage,
              BackgroundImage,
              BackgroundImage,
              BackgroundImage,
              BackgroundImage,
              BackgroundImage,
              BackgroundImage
            ]}
            imageSize={150}
            speed={5}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
