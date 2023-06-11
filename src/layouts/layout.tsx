import React from 'react';
import NavBar from '../components/navbar/navbar';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';
import styles from '@/styles/layouts/layout.module.sass';

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
    <div className={styles['container']}>
      <NavBar hasBackground={hasBackground} />
      <div className={styles['content']}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
