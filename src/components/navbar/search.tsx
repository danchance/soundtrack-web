import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { useRef } from 'react';
import SearchIcon from '@/assets/icons/search.png';
import styles from '@/styles/components/navbar/search.module.sass';

/**
 * Search component renders the search bar on the navigation bar.
 */
const Search = () => {
  const search = useRef<HTMLInputElement>(null);
  const windowSize = useWindowSize();

  /**
   * Show search bar on mobile devices as its hidden by default.
   */
  const showSearch = () => {
    console.log('show search');
  };

  /**
   * Handle search form submission.
   */
  const handleSearch = () => {
    console.log('search');
  };

  /**
   * Render search bar on mobile devices. Only show the search icon.
   */
  if (windowSize.width < 600) {
    return (
      <div className={`${styles['search-container']} ${styles['btn-only']}`}>
        <button className={styles['search-btn']} onClick={showSearch}>
          <Image src={SearchIcon} alt="search" width="20" height="20"></Image>
        </button>
      </div>
    );
  }

  /**
   * Render full search bar on large screen devices.
   */
  return (
    <div className={styles['search-container']}>
      <form onSubmit={handleSearch}>
        <input
          ref={search}
          type="text"
          placeholder="Search..."
          className={styles['search-input']}
        />
        <button className={styles['search-btn']}>
          <Image src={SearchIcon} alt="search" width="20" height="20"></Image>
        </button>
      </form>
    </div>
  );
};

export default Search;
