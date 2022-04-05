import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Error from "./components/Error";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (!loggedUserJSON) return;
    handleLogin(JSON.parse(loggedUserJSON));
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>setBlogs(blogs));
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
  }

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedNoteappUser");
  }

  const handleNotification = (newMessage, isError = false) => {
    const f = isError ? setErrorMessage : setInfoMessage;
    f(newMessage);
    setTimeout(() => f(""), 3000);
  }

  const handleCreateBlog = async blog => {
    try {
      const b = await blogService.create(blog);
      setBlogs(blogs.concat([{ ...b, user }]));
      handleNotification(`Blog added: '${b.title}' by ${b.author}`);
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      console.error(e);
      handleNotification(`Could not add blog`, true);
    }
  }

  const handleLikeBlog = async blog => {
    try {
      const newBlog = await blogService.like(blog);
      setBlogs(blogs.map(b => b.id === newBlog.id ? newBlog : b));
    } catch (e) {
      console.error(e);
      handleNotification(`Could not like blog`, true);
    }
  }

  const handleRemoveBlog = async blog => {
    const s = `${blog.title} by ${blog.author}`;
    if (!window.confirm(`Removing blog ${s}`)) return;
    try {
      await blogService.remove(blog);
      setBlogs(blogs.filter(b => b.id !== blog.id));
      handleNotification(`Blog removed: ${s} by ${blog.author}`);
    } catch (e) {
      console.error(e);
      handleNotification(`Could not remove blog`, true);
    }
  }

  return (
    <div>
      <Notification message={infoMessage} />
      <Error message={errorMessage} />
      { !user
        ? <LoginForm handleNotification={handleNotification} handleLogin={handleLogin} />
        : <>
          <p>
            {user.name || user.username} logged in
            <button onClick={handleLogout} >logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLikeBlog}
            handleRemove={handleRemoveBlog}
          />)}
        </>
      }
    </div>
  );
}

export default App;
