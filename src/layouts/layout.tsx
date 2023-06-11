import React from 'react';
import NavBar from '../components/navbar/navbar';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';
import styles from '@/styles/layouts/layout.module.sass';
import Head from 'next/head';

/**
 * Default layout used for all pages.
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  /**
   * If the current page is the home page, then the header should not have
   * a background
   */
  const hasBackground =
    pathname.includes('/user') || pathname.includes('/settings');

  return (
    <>
      <Head>
        <title>soundTrack</title>
        <meta
          name="description"
          content="SoundTrack, streaming history tracker."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles['container']}>
        <NavBar hasBackground={hasBackground} />
        <div className={styles['content']}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
