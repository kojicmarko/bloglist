import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

const User = () => {
  const users = useSelector(({ users }) => users);

  const match = useMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (!user) {
    return null;
  }

  return (
    <div className="mx-2">
      <h2 className="text-black text-3xl font-black text-center font-mono">
        User
      </h2>
      <h2 className="font-bold text-xl my-2">{user.name}</h2>
      <h3 className="font-semibold">Posted blogs:</h3>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li key={blog.id} className="ml-2">
              {blog.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
