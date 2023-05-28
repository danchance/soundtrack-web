import useWindowSize from '@/hooks/useWindowSize';
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
  const { width } = useWindowSize();

  /**
   * Calculate the page numbers to display, want to display the current page and the
   * 1/2 previous and next pages, e.g. for page 4: 2 3 (4) 5 6.
   * Special cases:
   *  - Less than 5 pages, display all page numbers
   *  - 2 previous pages do not exist, display more next pages, e.g. 1 (2) 3 4 5
   *  - 2 next pages do not exist, display more previous pages, e.g. 3 4 5 6 (7)
   *  - Screen width < 500px, only display 1 previous and next page
   */
  useEffect(() => {
    const pageNumbers = [...Array(maxPages).keys()].map((i) => i + 1);
    // Calculate items displayed based on screen size. Left offset is larger as it
    // includes the current page.
    let displayedNumbers = 5;
    let leftOffset = 3;
    let rightOffset = 2;
    if (width < 500) {
      displayedNumbers = 3;
      leftOffset = 2;
      rightOffset = 1;
    }
    if (maxPages <= displayedNumbers) {
      setPageNumbersList(pageNumbers);
      return;
    }
    if (currentPage - leftOffset < 0) {
      setPageNumbersList(pageNumbers.slice(0, displayedNumbers));
      return;
    }
    if (currentPage + rightOffset > maxPages) {
      setPageNumbersList(pageNumbers.slice(-displayedNumbers));
      return;
    }
    setPageNumbersList(
      pageNumbers.slice(currentPage - leftOffset, currentPage + rightOffset)
    );
  }, [currentPage, maxPages, width]);

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
