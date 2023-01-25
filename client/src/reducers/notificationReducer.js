/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

let timeoutId;

const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    content: null,
    type: 'info',
  },
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    clearNotification(state) {
      state.content = null;
      return state;
    },
  },
});

export const { notify, clearNotification } = notificationReducer.actions;

export const setNotification = (content, time, type) => async (dispatch) => {
  const notification = {
    content,
    type,
  };
  dispatch(notify(notification));

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch(clearNotification());
  }, time * 1000);
};

export default notificationReducer.reducer;
