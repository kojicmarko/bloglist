import { createSlice } from '@reduxjs/toolkit';

const togglableSlice = createSlice({
  name: 'togglable',
  initialState: false,
  reducers: {
    show() {
      return true;
    },
    hide() {
      return false;
    },
  },
});

export const { show, hide } = togglableSlice.actions;

export const toggleVisibility = (state) => async (dispatch) => {
  if (state) {
    dispatch(show());
  } else {
    dispatch(hide());
  }
};

export default togglableSlice.reducer;
