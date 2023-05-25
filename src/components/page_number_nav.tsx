import styles from '@/styles/components/page_number_nav.module.sass';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type PageNumberNavProps = {
  currentPage: number;
  maxPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

/**
 * Builds a page number navigation that is used to navigate through pages of data.
 * @param currentPage The page being viewed.
 * @param maxPages Total number of pages of content.
 * @param setCurrentPage Function to update the page being viewed.
 * @example If 4 is the active page: < Previous | 2 3 (4) 5 6 | Next >
 */
const PageNumberNav = ({
  currentPage,
  maxPages,
  setCurrentPage
}: PageNumberNavProps) => {
  const [pageNumbersList, setPageNumbersList] = useState<number[]>([]);

  /**
   * Calculate the page numbers to display, want to display the current page and the
   * 2 previous and next pages, e.g. for page 4: 2 3 (4) 5 6.
   * Special cases:
   *  - Less than 5 pages, display all page numbers
   *  - 2 previous pages do not exist, display more next pages, e.g. 1 (2) 3 4 5
   *  - 2 next pages do not exist, display more previous pages, e.g. 3 4 5 6 (7)
   */
  useEffect(() => {
    const pageNumbers = [...Array(maxPages).keys()].map((i) => i + 1);
    if (maxPages <= 5) {
      setPageNumbersList(pageNumbers);
      return;
    }
    if (currentPage - 3 < 0) {
      setPageNumbersList(pageNumbers.slice(0, 5));
      return;
    }
    if (currentPage + 2 > maxPages) {
      setPageNumbersList(pageNumbers.slice(-5));
      return;
    }
    setPageNumbersList(pageNumbers.slice(currentPage - 3, currentPage + 2));
  }, [currentPage, maxPages]);

  return (
    <div className={styles['container']}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={styles['prev-btn']}
      >
        <span className={styles['arrow']}>&#8249;</span>Previous
      </button>
      {pageNumbersList.map((pageNumber) => (
        <button
          key={pageNumber}
          disabled={pageNumber === currentPage}
          onClick={() => setCurrentPage(pageNumber)}
          className={styles['page-btn']}
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={currentPage === maxPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={styles['next-btn']}
      >
        Next<span className={styles['arrow']}>&#8250;</span>
      </button>
    </div>
  );
};

export default PageNumberNav;
