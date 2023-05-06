import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useEffect, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/loading_spinner';
import useAccessToken from '@/hooks/useAccessToken';
import { patch } from '@/utils/fetch_wrapper';
import Image from 'next/image';
import ProfileIcon from '@/assets/icons/profile.png';

type SettingsResponse = {
  privateProfile: boolean;
};

/**
 * User Privacy Settings page.
 * Options on this page are:
 *  - Set Profile private.
 */
const Privacy = () => {
  const { accessToken } = useAccessToken();
  const { error, data } = useFetch<SettingsResponse>(
    'http://localhost:8000/api/users/settings',
    true
  );
  const [privateProfile, setPrivateProfile] = useState<boolean | null>(null);

  useEffect(() => {
    console.log(privateProfile);
  }, [privateProfile]);

  /**
   * Set the initial state of the settings to the current user settings.
   */
  useEffect(() => {
    if (!data) return;
    setPrivateProfile(data.privateProfile);
  }, [data]);

  /**
   * Update the user settings after every change.
   */
  const updateSettings = async (key: string, value: boolean) => {
    try {
      await patch(
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

  if (error) {
    return (
      <div>
        {error.status} {error.message}
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <form className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Safety and Privacy</h2>
        <div className={[styles['setting'], styles['privacy']].join(' ')}>
          <div className={styles['info']}>
            <Image
              src={ProfileIcon}
              alt="profile"
              width={50}
              height={50}
            ></Image>
            <div>
              <h3 className={styles['setting-name']}>Profile Visibility</h3>
              <label
                htmlFor="private-profile"
                className={styles['setting-desc']}
              >
                Set your profile to private. This will prevent other users from
                viewing your profile.
              </label>
            </div>
          </div>
          <div className={styles['toggle-wrapper']}>
            {privateProfile === null && <LoadingSpinner size={1} weight={2} />}
            {privateProfile !== null && (
              <div className={styles['toggle-switch']}>
                <input
                  type="checkbox"
                  name="private-profile"
                  checked={privateProfile}
                  readOnly
                />
                <span
                  className={styles['toggle']}
                  onClick={() => {
                    updateSettings('privateProfile', !privateProfile);
                    setPrivateProfile(!privateProfile);
                  }}
                ></span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

Privacy.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout page={SettingsPage.PRIVACY}>{page}</SettingsLayout>;
};

export default Privacy;
