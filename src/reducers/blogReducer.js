import { createSlice } from "@reduxjs/toolkit";
import blogService from "./../services/blogs";

const slice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    set: (_, action) => action.payload,
    add: (state, action) => [...state, action.payload],
    remove: (state, action) => state.filter(b => b.id !== action.payload.id),
    update: (state, action) => state.map(b => (b.id === action.payload.id ? { ...action.payload, user: b.user } : b)),
  },
});

export const initalizeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll();
  dispatch(slice.actions.set(blogs));
};

export const createBlog = blog => async dispatch => {
  const b = await blogService.create(blog);
  dispatch(slice.actions.add(b));
};

export const removeBlog = blog => async dispatch => {
  const b = await blogService.remove(blog);
  dispatch(slice.actions.remove(blog));
};

export const likeBlog = blog => async dispatch => {
  const b = await blogService.like(blog);
  dispatch(slice.actions.update(b));
};

export const commentBlog = (blog, comment) => async dispatch => {
  const b = await blogService.comment(blog, comment);
  dispatch(slice.actions.update(b));
};

export default slice.reducer;
