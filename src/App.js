import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import { setNotification } from "./reducers/notificationReducer";
import { createBlog, initalizeBlogs, likeBlog, removeBlog } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser, logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initalizeBlogs());
  }, [dispatch]);

  const showNotification = message => dispatch(setNotification(message, 3, false));
  const showError = (message, error) => {
    if (error) console.error(error);
    dispatch(setNotification(message, 3, true));
  };

  const handleCreateBlog = async blog => {
    try {
      await dispatch(createBlog(blog));
      showNotification(`Blog added: '${blog.title}' by ${blog.author}`);
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      showError("Could not add blog", e);
    }
  };

  const handleLikeBlog = async blog => {
    try {
      await dispatch(likeBlog(blog));
    } catch (e) {
      showError("Could not like blog", e);
    }
  };

  const handleRemoveBlog = async blog => {
    const s = `${blog.title} by ${blog.author}`;
    if (!window.confirm(`Removing blog ${s}`)) return;
    try {
      await dispatch(removeBlog(blog));
      showNotification(`Blog removed: ${s} by ${blog.author}`);
    } catch (e) {
      showError("Could not remove blog", e);
    }
  };

  return (
    <div>
      <Notification />
      {!user ? (
        <LoginForm />
      ) : (
        <>
          <p>
            {user.name || user.username} logged in
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <h2>Blogs</h2>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog key={blog.id} blog={blog} user={user} handleLike={handleLikeBlog} handleRemove={handleRemoveBlog} />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
