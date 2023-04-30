import useFetch from '@/hooks/useFetch';
import styles from '@/styles/layouts/library_layout.module.sass';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BackgroundImage from '@/assets/images/main-background.jpg';

type LibraryLayoutProps = {
  children: React.ReactNode;
  pageType: LibraryPage;
};

export enum LibraryPage {
  ARTIST = 'Artist',
  ALBUM = 'Album',
  TRACK = 'Track'
}

type LibraryResponse = {
  id: string;
  name: string;
  artwork: string;
};

/**
 * Layout used on all library pages (artist, album and track).
 */
const LibraryLayout = ({ children, pageType }: LibraryLayoutProps) => {
  const router = useRouter();
  const [url, setUrl] = useState<string>('');
  const { data } = useFetch<LibraryResponse>(url);

  /**
   * Set the url to fetch data from based on the page type.
   */
  useEffect(() => {
    if (pageType === LibraryPage.ARTIST && router.query.artist) {
      setUrl(`http://localhost:8000/api/artists/${router.query.artist}`);
      return;
    }
    if (pageType === LibraryPage.ALBUM) {
      setUrl(`http://localhost:8000/api/albums/${router.query.album}`);
      return;
    }
    if (pageType === LibraryPage.TRACK) {
      setUrl(`http://localhost:8000/api/tracks/${router.query.track}`);
      return;
    }
  }, [pageType, router.query]);

  return (
    <>
      {data && (
        <div className={styles['library-header']}>
          <div className={styles['hero-img']}>
            <Image src={BackgroundImage} alt="" fill></Image>
          </div>
          <div className={styles['header-wrapper']}>
            <Image
              className={styles['primary-img']}
              src={data.artwork}
              alt={data.name}
              width={220}
              height={220}
            ></Image>
            <div className={styles['header-info']}>
              <h1>{data.name.toUpperCase()}</h1>
            </div>
          </div>
        </div>
      )}
      <div className={styles['library-wrapper']}>{children}</div>
    </>
  );
};

export default LibraryLayout;
