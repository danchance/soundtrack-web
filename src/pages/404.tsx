import styles from '@/styles/pages/error.module.sass';
import Default404 from '@/components/default_404';

/**
 * Custom 404 Not Found page.
 */
const Custom404 = () => {
  return (
    <>
      <div className={styles['nav-background']}></div>
      <Default404 />
    </>
  );
};

export default Custom404;
