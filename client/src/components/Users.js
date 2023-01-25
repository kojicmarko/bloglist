import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector(({ users }) => users);
  return (
    <>
      <h2 className="text-black text-3xl font-black text-center font-mono">
        Users
      </h2>
      <table className="mx-2">
        <thead>
          <tr>
            <th className="text-center">User</th>
            <th className="text-center">Blogs posted</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="text-center">
                <Link
                  to={`/users/${user.id}`}
                  className="font-semibold hover:text-orange-300"
                >
                  {user.name}
                </Link>
              </td>
              <td className="text-center">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
