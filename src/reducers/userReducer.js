import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const slice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (_, action) => action.payload,
    logout: () => null,
  },
});

export const initializeUser = () => async dispatch => {
  const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
  if (!loggedUserJSON) return;
  const user = JSON.parse(loggedUserJSON);
  dispatch(slice.actions.login(user));
  loginService.setToken(user.token);
};

export const login = (username, password) => async dispatch => {
  const user = await loginService.login({
    username,
    password,
  });
  dispatch(slice.actions.login(user));
  loginService.setToken(user.token);
  window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
};

export const logout = () => async dispatch => {
  dispatch(slice.actions.logout());
  loginService.setToken(null);
  window.localStorage.removeItem("loggedNoteappUser");
};

export default slice.reducer;
