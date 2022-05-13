import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

  const blogFormRef = useRef();

  const showError = (message, error) => {
    if (error) console.error(error);
    dispatch(setNotification(message, 3, true));
  };

  const handleCreateBlog = async blog => {
    try {
      await dispatch(createBlog(blog));
      dispatch(setNotification(`Blog added: '${blog.title}' by ${blog.author}`));
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
      dispatch(setNotification(`Blog removed: ${s} by ${blog.author}`));
    } catch (e) {
      showError("Could not remove blog", e);
    }
  };

  return <>
    <div className="container">
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
    </div>

    <div className="container">
      <h2>Blogs</h2>
      {
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} handleLike={handleLikeBlog} handleRemove={handleRemoveBlog} />
          ))
      }
    </div>
  </>;
};

export default Blogs;
