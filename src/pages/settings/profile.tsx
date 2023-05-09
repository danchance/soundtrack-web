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

type UpdateSettingsResponse = {
  topTracksTimeframe?: SettingStatus;
  topTracksStyle?: SettingStatus;
  topAlbumsTimeframe?: SettingStatus;
  topAlbumsStyle?: SettingStatus;
  topArtistsTimeframe?: SettingStatus;
  topArtistsStyle?: SettingStatus;
};

type SettingStatus = {
  status: 'success' | 'failure';
  message?: string;
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
  const [topTracksError, setTopTracksError] = useState<boolean>(false);
  const [topAlbumsError, setTopAlbumsError] = useState<boolean>(false);
  const [topArtistsError, setTopArtistsError] = useState<boolean>(false);

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
   * Update the user settings after every change. If an error occurred,
   * display an error message.
   */
  const updateSettings = async (key: string, value: string) => {
    try {
      setTopTracksError(false);
      setTopAlbumsError(false);
      setTopArtistsError(false);
      const res = await patch<UpdateSettingsResponse>(
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
      if (res[key as keyof UpdateSettingsResponse]?.status === 'failure') {
        throw res;
      }
    } catch (error) {
      if (key.substring(0, 9) === 'topTracks') {
        setTopTracksError(true);
      }
      if (key.substring(0, 9) === 'topAlbums') {
        setTopAlbumsError(true);
      }
      if (key.substring(0, 10) === 'topArtists') {
        setTopArtistsError(true);
      }
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
   * No specific error handling, redirect to 500 page if we were unable to
   * fetch the users settings.
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
          {topTracksError && (
            <p className={styles['error-msg']}>
              An error occurred trying to update your track preferences, please
              try again later.
            </p>
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
          {topAlbumsError && (
            <p className={styles['error-msg']}>
              An error occurred trying to update your album preferences, please
              try again later.
            </p>
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
          {topArtistsError && (
            <p className={styles['error-msg']}>
              An error occurred trying to update your artist preferences, please
              try again later.
            </p>
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
