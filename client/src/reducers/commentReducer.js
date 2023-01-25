import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { toggleVisibility } from './togglableReducer';
import { setNotification } from './notificationReducer';

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.unshift(action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  commentSlice.actions;

export const createBlog = (object) => {
  return async (dispatch) => {
    try {
      dispatch(toggleVisibility(false));
      const newBlog = await blogService.create(object);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `added a new blog ${object.title} by ${object.author}`,
          5
        )
      );
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5, 'alert'));
    }
  };
};

export default commentSlice.reducer;
