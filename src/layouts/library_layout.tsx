import styles from '@/styles/layouts/library_layout.module.sass';

type LibraryLayoutProps = {
  children: React.ReactNode;
};

/**
 * Layout used on all library pages (track, album and artist).
 */
const LibraryLayout = ({ children }: LibraryLayoutProps) => {
  return <div className={styles['library-wrapper']}>{children}</div>;
};

export default LibraryLayout;
