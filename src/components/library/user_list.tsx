import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/library/list.module.sass';
import GoldMedal from '@/assets/icons/gold.png';
import SilverMedal from '@/assets/icons/silver.png';
import BronzeMedal from '@/assets/icons/bronze.png';

type UserListProps = {
  users: {
    id: string;
    username: string;
    picture: string;
    count: number;
  }[];
};

/**
 * Component for displaying top listeners of an artist, album or track.
 * Builds a table wit the columns: Rank, Profile Image, Username, Streams
 * @param users Array of users
 */
const UserList = ({ users }: UserListProps) => {
  return (
    <div className={styles['container']}>
      <h2 className={styles['heading']}>TOP LISTENERS</h2>
      <table>
        <thead>
          <tr>
            <th className={styles['rank-col']}>#</th>
            <th className={styles['image-col']}></th>
            <th className={styles['title-col']}>User</th>
            <th className={styles['plays-col']}>Plays</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className={styles['rank-col']}>
                {index <= 2 && (
                  <Image
                    src={
                      index === 0
                        ? GoldMedal
                        : index === 1
                        ? SilverMedal
                        : BronzeMedal
                    }
                    alt={(index + 1).toString()}
                    width={30}
                    height={30}
                  ></Image>
                )}
                {index > 2 && index + 1}
              </td>
              <td className={styles['image-col']}>
                <Link
                  href={{
                    pathname: `/user/[username]/profile`,
                    query: {
                      username: user.username
                    }
                  }}
                >
                  <Image
                    src={user.picture}
                    alt=""
                    width={40}
                    height={40}
                  ></Image>
                </Link>
              </td>
              <td className={styles['title-col']}>
                <Link
                  href={{
                    pathname: `/user/[username]/profile`,
                    query: {
                      username: user.username
                    }
                  }}
                >
                  {user.username}
                </Link>
              </td>
              <td className={styles['plays-col']}>{user.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <h3 className={styles['no-rows-msg']}>Be the first to appear here!</h3>
      )}
    </div>
  );
};

export default UserList;
