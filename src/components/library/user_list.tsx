import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/library/list.module.sass';

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
 * @returns
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
              <td className={styles['rank-col']}>{index + 1}</td>
              <td className={styles['image-col']}>
                <Image src={user.picture} alt="" width={40} height={40}></Image>
              </td>
              <td className={styles['title-col']}>
                <Link
                  href={{
                    pathname: `/user/[username]`,
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
    </div>
  );
};

export default UserList;
