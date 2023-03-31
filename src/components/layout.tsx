import React from 'react';
import NavBar from './navbar';
import styles from '@/styles/components/layout.module.sass';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className={styles['container']}>{children}</div>
    </>
  );
};

export default Layout;
