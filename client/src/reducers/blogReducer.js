import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import commentService from '../services/comments';
import { toggleVisibility } from './togglableReducer';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const blogToUpdate = state.find((b) => b.id === id);
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };
      return state.map((b) => (b.id !== id ? b : updatedBlog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      state = state.filter((b) => b.id !== id);
      return state;
    },
    appendComment(state, action) {
      const id = action.payload.blog;
      const comment = {
        content: action.payload.content,
        id: action.payload.id,
      };
      const blogToUpdate = state.find((b) => b.id === id);
      const updatedBlog = {
        ...blogToUpdate,
        comments: [...blogToUpdate.comments, comment],
      };
      return state.map((b) => (b.id !== id ? b : updatedBlog));
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog, appendComment } =
  blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (object) => async (dispatch) => {
  try {
    dispatch(toggleVisibility(false));
    const newBlog = await blogService.create(object);
    dispatch(appendBlog(newBlog));
    dispatch(
      setNotification(`added a new blog ${object.title} by ${object.author}`, 5)
    );
  } catch (err) {
    dispatch(setNotification(err.response.data.error, 5, 'alert'));
  }
};

export const like = (object) => async (dispatch) => {
  const updatedBlog = await blogService.update({
    ...object,
    likes: object.likes + 1,
  });
  dispatch(updateBlog(updatedBlog));
};
export const remove = (object) => {
  return async (dispatch) => {
    await blogService.remove(object.id);
    dispatch(removeBlog(object.id));
  };
};

export const createComment = (object) => async (dispatch) => {
  try {
    const newComment = await commentService.create(object);
    dispatch(appendComment(newComment));
  } catch (err) {
    dispatch(setNotification(err.response.data.error, 3, 'alert'));
  }
};

export default blogSlice.reducer;
