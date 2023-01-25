import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
  return (
    <div className="bg-orange-500 text-xl flex flex-wrap justify-between">
      <div className="flex items-center font-mono">
        <Link className="px-1 font-semibold hover:text-orange-300 ml-2" to="/">
          blogs
        </Link>
        <span className="text-sm">|</span>
        <Link className="px-1 font-semibold hover:text-orange-300" to="/users">
          users
        </Link>
      </div>
      <div className="flex items-center">
        <Logout />
      </div>
    </div>
  );
};

export default Navbar;
