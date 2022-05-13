import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notification",
  initialState: { message: null, isError: false },
  reducers: {
    set: (_, action) => action.payload,
    remove: (state, action) => ({ ...state, message: state.message === action.payload ? null : state.message }),
  }
});

export const setNotification = (message, timeout = 3) => async dispatch => {
  dispatch(slice.actions.set({ message, isError: false }));
  setTimeout(() => dispatch(slice.actions.remove(message)), 1000 * timeout);
};

export const setError = (message, timeout = 3) => async dispatch => {
  dispatch(slice.actions.set({ message, isError: true }));
  setTimeout(() => dispatch(slice.actions.remove(message)), 1000 * timeout);
};

export default slice.reducer;
