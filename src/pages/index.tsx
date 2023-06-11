import Head from 'next/head';
import styles from '@/styles/pages/home.module.sass';
import Image from 'next/image';
import BackgroundImage from '@/assets/images/main-background.jpg';
import DemoImage from '@/assets/images/demo1.jpg';
import DemoImage2 from '@/assets/images/demo2.jpg';
import ImageSlider from '@/components/image_slider';
import { useAuth0 } from '@auth0/auth0-react';
import useWindowSize from '@/hooks/useWindowSize';
import SpotifyLogo from '@/assets/icons/spotify_icon_logo_green.png';
import BannerImage1 from '@/assets/images/home_page_banner/bat_out_of_hell.jpg';
import BannerImage2 from '@/assets/images/home_page_banner/high_voltage.jpg';
import BannerImage3 from '@/assets/images/home_page_banner/dark_side_of_the_moon.jpg';
import BannerImage4 from '@/assets/images/home_page_banner/rumours.jpg';
import BannerImage5 from '@/assets/images/home_page_banner/from_death_to_destiny.jpg';
import BannerImage6 from '@/assets/images/home_page_banner/moral_panic.jpg';
import BannerImage7 from '@/assets/images/home_page_banner/thats_the_spirit.jpg';
import BannerImage8 from '@/assets/images/home_page_banner/live_at_wembley_stadium.jpg';
import BannerImage9 from '@/assets/images/home_page_banner/the_sickness.jpg';
import BannerImage10 from '@/assets/images/home_page_banner/all_this_bad_blood.jpg';
import BannerImage11 from '@/assets/images/home_page_banner/hot_fuss.jpg';
import BannerImage12 from '@/assets/images/home_page_banner/the_essential_michael_jackson.jpg';
import BannerImage13 from '@/assets/images/home_page_banner/californication.jpg';
import BannerImage14 from '@/assets/images/home_page_banner/unleashed.jpg';
import BannerImage15 from '@/assets/images/home_page_banner/tattoo_you.jpg';
import BannerImage16 from '@/assets/images/home_page_banner/the_subliminal_verses.jpg';
import BannerImage17 from '@/assets/images/home_page_banner/master_of_puppets.jpg';
import BannerImage18 from '@/assets/images/home_page_banner/brothers_in_arms.jpg';
import BannerImage19 from '@/assets/images/home_page_banner/living_the_dream.jpg';
import BannerImage20 from '@/assets/images/home_page_banner/whos_next.jpg';

const Home = () => {
  const { loginWithRedirect } = useAuth0();
  const { width } = useWindowSize();

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
          <p>Sign up and link your Spotify account to get started.</p>
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
            <div className={styles['text-container']}>
              <Image
                src={SpotifyLogo}
                alt="Spotify Logo"
                width={118}
                height={35}
                className={styles['spotify-img']}
              ></Image>
              <h2>
                Connect your Spotify account to track your listening habits.
              </h2>
              <p>
                From your top artists and albums to your most-played tracks,
                you&apos;ll have access to a treasure trove of data, all neatly
                organized and easily accessible.
              </p>
            </div>
          </div>
        </div>
        {/* Leave out for now */}
        {/* <div className={styles['section3']}>
          <div className={styles['text-container']}>content here</div>
          <div className={styles['image-container']}>
            <Image src={DemoImage2} alt="" fill></Image>
          </div>
        </div> */}
        {width >= 800 && (
          <div className={styles['slider-container']}>
            <ImageSlider
              images={[
                BannerImage1,
                BannerImage2,
                BannerImage3,
                BannerImage4,
                BannerImage5,
                BannerImage6,
                BannerImage7,
                BannerImage8,
                BannerImage9,
                BannerImage10,
                BannerImage11,
                BannerImage12,
                BannerImage13,
                BannerImage14,
                BannerImage15,
                BannerImage16,
                BannerImage17,
                BannerImage18,
                BannerImage19,
                BannerImage20
              ]}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
