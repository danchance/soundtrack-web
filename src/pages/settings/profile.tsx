import styles from '@/styles/pages/settings.module.sass';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import useFetch from '@/hooks/useFetch';
import useAccessToken from '@/hooks/useAccessToken';
import { patch } from '@/utils/fetch_wrapper';
import UploadImage from '@/components/settings/upload_image';
import ClockIcon from '@/assets/icons/clock.svg';
import StyleIcon from '@/assets/icons/style.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

export enum StyleType {
  LIST = 'list',
  GRID = 'grid',
  CHART = 'chart'
}

export enum Timeframe {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  ALL = 'all'
}

type SettingsResponse = {
  profilePicture: string;
  bannerPicture: string;
  topTracksTimeframe: Timeframe;
  topTracksStyle: StyleType;
  topAlbumsTimeframe: Timeframe;
  topAlbumsStyle: StyleType;
  topArtistsTimeframe: Timeframe;
  topArtistsStyle: StyleType;
};

/**
 * User Profile Settings page.
 * Options on this page are:
 * - Profile Picture.
 * - Profile Layout.
 *    - Top Tracks (Layout and timeframe).
 *    - Top Albums (Layout and timeframe).
 *    - Top Artists (Layout and timeframe).
 */
const Profile = () => {
  const { accessToken } = useAccessToken();
  const { error, data } = useFetch<SettingsResponse>(
    'http://localhost:8000/api/users/settings',
    true
  );
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [bannerPicture, setBannerPicture] = useState<string>('');
  const [topTracksTimeframe, setTopTracksTimeframe] = useState<Timeframe>();
  const [topTracksStyle, setTopTracksStyle] = useState<StyleType>();
  const [topAlbumsTimeframe, setTopAlbumsTimeframe] = useState<Timeframe>();
  const [topAlbumsStyle, setTopAlbumsStyle] = useState<StyleType>();
  const [topArtistsTimeframe, setTopArtistsTimeframe] = useState<Timeframe>();
  const [topArtistsStyle, setTopArtistsStyle] = useState<StyleType>();

  /**
   * Set the initial state of the settings to the current user settings.
   */
  useEffect(() => {
    if (!data) return;
    setProfilePicture(data.profilePicture);
    setBannerPicture(data.bannerPicture);
    setTopTracksTimeframe(data.topTracksTimeframe);
    setTopTracksStyle(data.topTracksStyle);
    setTopAlbumsTimeframe(data.topAlbumsTimeframe);
    setTopAlbumsStyle(data.topAlbumsStyle);
    setTopArtistsTimeframe(data.topArtistsTimeframe);
    setTopArtistsStyle(data.topArtistsStyle);
  }, [data]);

  /**
   * Update the user settings after every change.
   */
  const updateSettings = async (key: string, value: string) => {
    try {
      const res = await patch(
        `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/users/settings`,
        JSON.stringify({
          [key]: value
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Builds the dropdowns used to select the Timeframe and StyleType.
   * @param label Label for the dropdown.
   * @param name Name of the dropdown.
   * @param value Value of the dropdown.
   * @param setValue Function to set the value of the dropdown.
   * @returns A dropdown element.
   */
  const DropdownOption = <T extends Timeframe | StyleType | undefined>(
    label: string,
    name: string,
    value: T,
    setValue: Dispatch<SetStateAction<T>>
  ) => {
    return (
      <div className={styles['setting-option']}>
        <Image
          src={
            Object.values(Timeframe).includes(value as Timeframe)
              ? ClockIcon
              : StyleIcon
          }
          alt="timeframe"
          width={20}
          height={20}
        ></Image>
        <label htmlFor={name} className={styles['option-name']}>
          {label}
        </label>
        <select
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value as T);
            updateSettings(e.target.name, e.target.value);
          }}
        >
          {Object.values(Timeframe).includes(value as Timeframe) && (
            <>
              <option value={Timeframe.WEEK}>Week</option>
              <option value={Timeframe.MONTH}>Month</option>
              <option value={Timeframe.YEAR}>Year</option>
              <option value={Timeframe.ALL}>All Time</option>
            </>
          )}
          {Object.values(StyleType).includes(value as StyleType) && (
            <>
              <option value={StyleType.LIST}>List</option>
              <option value={StyleType.GRID}>Grid</option>
              <option value={StyleType.CHART}>Chart</option>
            </>
          )}
        </select>
      </div>
    );
  };

  /**
   * No specific error handling, redirect to 500 page.
   */
  if (error) {
    router.push('/500');
  }

  if (!data) return <></>;

  return (
    <div className={styles['container']}>
      <div className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Profile Picture</h2>
        <div className={styles['setting']}>
          <UploadImage
            imageType="profile"
            previewImage={profilePicture}
            setPreviewImage={setProfilePicture}
          />
        </div>
      </div>
      <div className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Banner Image</h2>
        <div className={styles['setting']}>
          <UploadImage
            imageType="banner"
            previewImage={bannerPicture}
            setPreviewImage={setBannerPicture}
          />
        </div>
      </div>
      <form className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Profile Layout Preferences</h2>
        <div className={[styles['setting'], styles['layout']].join(' ')}>
          <h3 className={styles['setting-name']}>Top Tracks</h3>
          {DropdownOption(
            'Timeframe:',
            'topTracksTimeframe',
            topTracksTimeframe,
            setTopTracksTimeframe
          )}
          {DropdownOption(
            'Style:',
            'topTracksStyle',
            topTracksStyle,
            setTopTracksStyle
          )}
        </div>
        <div className={[styles['setting'], styles['layout']].join(' ')}>
          <h3 className={styles['setting-name']}>Top Albums</h3>

          {DropdownOption(
            'Timeframe:',
            'topAlbumsTimeframe',
            topAlbumsTimeframe,
            setTopAlbumsTimeframe
          )}
          {DropdownOption(
            'Style:',
            'topAlbumsStyle',
            topAlbumsStyle,
            setTopAlbumsStyle
          )}
        </div>
        <div className={[styles['setting'], styles['layout']].join(' ')}>
          <h3 className={styles['setting-name']}>Top Artists</h3>
          {DropdownOption(
            'Timeframe:',
            'topArtistsTimeframe',
            topArtistsTimeframe,
            setTopArtistsTimeframe
          )}
          {DropdownOption(
            'Style:',
            'topArtistsStyle',
            topArtistsStyle,
            setTopArtistsStyle
          )}
        </div>
      </form>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout page={SettingsPage.PROFILE}>{page}</SettingsLayout>;
};

export default Profile;
