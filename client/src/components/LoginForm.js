import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    e.target.username.value = '';
    e.target.password.value = '';
    dispatch(login({ username, password }));
  };

  // I know its bad
  const handleDemo = async (e) => {
    e.preventDefault();

    const username = 'demo';
    const password = 'demo';
    dispatch(login({ username, password }));
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-orange-50">
      <h2 className="text-4xl font-bold font-mono mt-0 mb-4 text-black">
        Blog-List
      </h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            className="text-xl w-auto font-normal border border-orange-400 mb-2"
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="text-xl w-auto font-normal border border-orange-400 mb-2"
          />
        </div>
        <div className="">
          <button
            id="login-btn"
            type="submit"
            className="bg-orange-400 text-orange-50 hover:bg-orange-500  font-semibold  text-l py-2 px-6 mr-2"
          >
            Log in
          </button>

          <button
            onClick={handleDemo}
            id="demo-btn"
            type="button"
            className="bg-orange-400 text-orange-50 hover:bg-orange-500  font-semibold  text-l py-2 px-6"
          >
            Demo
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
