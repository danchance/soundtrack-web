import React from 'react';
import NavBar from '../components/navbar/navbar';
import styles from '@/styles/layouts/layout.module.sass';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const fullLayout = ['/'].includes(useRouter().pathname);
  let containerClass = 'container';
  if (fullLayout) {
    containerClass = 'full-container';
  }

  return (
    <>
      <NavBar hasBackground={!fullLayout} />
      <div className={styles[containerClass]}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
