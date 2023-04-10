import React from 'react';
import NavBar from '../components/navbar/navbar';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';

/**
 * Default layout used for all pages.
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  /**
   * If the current page is the home page, then the header should not have
   * a background
   */
  const headerBackground = !['/'].includes(useRouter().pathname);

  return (
    <>
      <NavBar hasBackground={headerBackground} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
