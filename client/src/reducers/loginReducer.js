import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const loginSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
  },
});

export const { setLoggedUser } = loginSlice.actions;

export const loggedUser = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    dispatch(setLoggedUser(user));
    blogService.setToken(user.token);
  }
};

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLoggedUser(user));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5, 'alert'));
    }
  };

export default loginSlice.reducer;
