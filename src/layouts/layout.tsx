import React from 'react';
import NavBar from '../components/navbar/navbar';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';
import styles from '@/styles/layouts/layout.module.sass';

/**
 * Default layout used for all pages.
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  /**
   * If the current page is the home page, then the header should not have
   * a background
   */
  const isHomePage = ['/'].includes(useRouter().pathname);

  return (
    <div className={styles['container']}>
      <NavBar hasBackground={true} />
      <div className={styles['content']}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
