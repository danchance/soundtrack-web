import { useState } from 'react';
import styles from '@/styles/pages/settings.module.sass';
import { _delete } from '@/utils/fetch_wrapper';
import useAccessToken from '@/hooks/useAccessToken';
import { User, useAuth0 } from '@auth0/auth0-react';

type DeleteAccountProps = {
  user: User;
};

/**
 * Component to permanently delete the user account.
 * @param user Logged in user.
 */
const DeleteAccount = ({ user }: DeleteAccountProps) => {
  const { logout } = useAuth0();
  const { accessToken } = useAccessToken();
  const [deleteAccountError, setDeleteAccountError] = useState<string>('');

  /**
   * Delete user account.
   */
  const deleteAccount = async () => {
    setDeleteAccountError('');
    try {
      await _delete(
        `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/users/${user!.sub}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      // Account deleted successfully, log user out and redirect to home page.
      logout();
    } catch (error) {
      setDeleteAccountError(
        "Something went wrong, we couldn't delete your account."
      );
    }
  };

  return (
    <div className={styles['settings-group']}>
      <h2 className={styles['group-heading']}>Account Actions</h2>
      <div className={[styles['setting'], styles['delete']].join(' ')}>
        <h3 className={styles['setting-name']}>Delete Account</h3>
        <p className={styles['setting-desc']}>
          Once you delete your account, your profile and username are
          permanently removed from soundTrack, and your listening history is
          deleted.
        </p>
        <p className={styles['setting-desc']}>This action is not reversible.</p>
        <button onClick={deleteAccount} className={styles['delete-btn']}>
          Delete Account
        </button>
        {deleteAccountError && (
          <p className={styles['error']}>{deleteAccountError}</p>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;
