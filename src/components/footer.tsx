import styles from '@/styles/components/footer.module.sass';
import Link from 'next/link';
import SpotifyLogo from '@/assets/icons/spotify_icon_logo_green.png';
import GitHubLogo from '@/assets/icons/github_icon_white.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['container']}>
        <div className={styles['github-ref']}>
          <span>View on </span>
          <Link
            target="_blank"
            href="https://github.com/danchance/soundtrack-web"
          >
            <Image src={GitHubLogo} alt="Github" width={20} height={20}></Image>
            GitHub
          </Link>
        </div>
        <div className={styles['icons-ref']}>
          <p className={styles['heading']}>Icons from:</p>
          <Link target="_blank" href="http://www.freepik.com">
            Freepik
          </Link>
          <Link target="_blank" href="https://icons8.com">
            Icons8
          </Link>
        </div>
        <div className={styles['spotify-ref']}>
          <span className={styles['heading']}>Data provided by</span>
          <Link target="_blank" href="https://developer.spotify.com/">
            <Image
              src={SpotifyLogo}
              alt="Spotifiy"
              width={98}
              height={29}
            ></Image>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
