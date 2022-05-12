import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notification",
  initialState: { message: null, isError: false },
  reducers: {
    set: (_, action) => action.payload,
    remove: (state, action) => ({ ...state, message: state.message === action.payload ? null : state.message }),
  }
});

export const setNotification = (message, timeout, isError) => async dispatch => {
  dispatch(slice.actions.set({ message, isError }));
  setTimeout(() => dispatch(slice.actions.remove(message)), 1000 * timeout);
};

export default slice.reducer;
