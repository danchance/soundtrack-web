import useFetch from '@/hooks/useFetch';
import styles from '@/styles/layouts/library_layout.module.sass';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BackgroundImage from '@/assets/images/main-background.jpg';
import Link from 'next/link';
import { formatTime } from '@/utils/format_date_time';

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
  releaseYear?: number;
  trackNum?: number;
  artistName?: string;
  artistSlug?: string;
  duration?: number;
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
    if (pageType === LibraryPage.ALBUM && router.query.album) {
      setUrl(`http://localhost:8000/api/albums/${router.query.album}`);
      return;
    }
    if (pageType === LibraryPage.TRACK && router.query.track) {
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
              width={230}
              height={230}
            ></Image>
            <div className={styles['header-info']}>
              <div className={styles['title']}>
                <h1>{data.name.toUpperCase()}</h1>
                {(pageType === LibraryPage.ALBUM ||
                  pageType === LibraryPage.TRACK) && (
                  <h1 className={styles['artist-name']}>
                    <Link
                      href={{
                        pathname: `/library/[artist]`,
                        query: {
                          artist: data!.artistSlug
                        }
                      }}
                    >
                      BY {data.artistName?.toUpperCase()}
                    </Link>
                  </h1>
                )}
              </div>
              {pageType === LibraryPage.ALBUM && (
                <div className={styles['album-data']}>
                  <h2>{data.releaseYear}</h2>
                  <span>&bull;</span>
                  <h2>{data.trackNum} songs</h2>
                  <span>&bull;</span>
                  <h2>{formatTime(data.duration!)}</h2>
                </div>
              )}
              {pageType === LibraryPage.TRACK && (
                <div className={styles['album-data']}>
                  <h2>Duration: {formatTime(data.duration!)}</h2>
                </div>
              )}
              <div
                className={[styles['tag'], styles[pageType.toLowerCase()]].join(
                  ' '
                )}
              >
                {pageType.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles['library-wrapper']}>{children}</div>
    </>
  );
};

export default LibraryLayout;
