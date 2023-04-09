import React from 'react';
import NavBar from '../components/navbar';
import styles from '@/styles/layouts/layout.module.sass';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const fullLayout = ['/'].includes(useRouter().pathname);
  let containerClass = 'container';
  if (fullLayout) {
    containerClass = 'full-container';
  }

  return (
    <>
      <NavBar />
      <div className={styles[containerClass]}>{children}</div>
    </>
  );
};

export default Layout;
