import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { initializeBlogs } from './reducers/blogReducer';
import { loggedUser } from './reducers/loginReducer';
import Users from './components/Users';
import User from './components/User';
import Home from './components/Home';
import { initializeUsers } from './reducers/userReducer';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  const currentUser = useSelector(({ loggedUser }) => loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  return (
    <>
      <Notification />
      {currentUser === null ? (
        <div>
          <LoginForm />
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/users/:id" element={<User />}></Route>
            <Route path="/blogs/:id" element={<Blog />}></Route>
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
