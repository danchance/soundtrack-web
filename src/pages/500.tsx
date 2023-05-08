import styles from '@/styles/pages/error.module.sass';
import Default500 from '@/components/default_500';

/**
 * Custom 500 Server Error page.
 */
const Custom500 = () => {
  return (
    <>
      <div className={styles['nav-background']}></div>
      <Default500 />
    </>
  );
};

export default Custom500;
