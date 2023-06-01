import styles from '@/styles/pages/settings.module.sass';
import { ReactElement, useEffect, useState } from 'react';
import SettingsLayout, { SettingsPage } from '@/layouts/settings_layout';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/loading_spinner';
import useAccessToken from '@/hooks/useAccessToken';
import { patch } from '@/utils/fetch_wrapper';
import Image from 'next/image';
import ProfileIcon from '@/assets/icons/profile.png';
import { useRouter } from 'next/router';

type SettingsResponse = {
  privateProfile: boolean;
};

type UpdateSettingsResponse = {
  privateProfile: { status: 'success' | 'failure'; message: string };
};

/**
 * User Privacy Settings page.
 * Options on this page are:
 *  - Set Profile private.
 */
const Privacy = () => {
  const { accessToken } = useAccessToken();
  const { error, data } = useFetch<SettingsResponse>(
    `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/users/settings`,
    true
  );
  const router = useRouter();
  const [privateProfile, setPrivateProfile] = useState<boolean | null>(null);
  const [privateError, setPrivateError] = useState<boolean>(false);

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
      setPrivateError(false);
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
      if (res.privateProfile.status === 'failure') {
        setPrivateError(true);
        setPrivateProfile(!value);
      }
    } catch (error) {
      setPrivateError(true);
      setPrivateProfile(!value);
    }
  };

  /**
   * No specific error handling, redirect to 500 page if we were unable to
   * fetch the users settings.
   */
  if (error) {
    router.push('/500');
  }

  return (
    <div className={styles['container']}>
      <form className={styles['settings-group']}>
        <h2 className={styles['group-heading']}>Safety and Privacy</h2>
        <div className={[styles['setting'], styles['privacy']].join(' ')}>
          <div className={styles['wrapper']}>
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
                  Set your profile to private. This will prevent other users
                  from viewing your profile.
                </label>
              </div>
            </div>
            <div className={styles['toggle-wrapper']}>
              {privateProfile === null && (
                <LoadingSpinner size={1} weight={2} />
              )}
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
          {privateError && (
            <div className={styles['error']}>
              <div className={styles['filler']}></div>
              <p className={styles['message']}>
                Something went wrong updating your preferences, please try
                again.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

Privacy.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout page={SettingsPage.PRIVACY}>{page}</SettingsLayout>;
};

export default Privacy;
