import { setLoggedUser } from '../reducers/loginReducer';
import { toggleVisibility } from '../reducers/togglableReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const name = useSelector(({ loggedUser }) => loggedUser.name);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(setLoggedUser(null));
    dispatch(toggleVisibility(false)); // hides the BlogForm once the User logs out
    navigate('/');
  };

  return (
    <div className="flex items-center mr-2">
      <span className="px-1 font-semibold">{name}</span>
      <div className="text-sm">|</div>
      <button
        type="button"
        className="logout-brn px-1 hover:text-orange-300 font-semibold "
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default Logout;
