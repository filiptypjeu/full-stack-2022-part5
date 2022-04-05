import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Error from "./components/Error";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [header, setHeader] = useState("blogs");

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
    setHeader("blogs");
  }

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedNoteappUser");
    setHeader("log in to application");
  }

  const handleNotification = (newMessage, isError = false) => {
    const f = isError ? setErrorMessage : setInfoMessage;
    f(newMessage);
    setTimeout(() => f(""), 3000);
  }

  const handleCreateBlog = async blog => {
    try {
      const b = await blogService.create(blog);
      console.log(b);
      setBlogs(blogs.concat([b]));
      handleNotification(`Blog added: '${b.title}' by ${b.author}`);
    } catch (e) {
      handleNotification(`Could not add blog`, true);
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
          <h2>Create a new blog</h2>
          <BlogForm handleCreateBlog={handleCreateBlog} />
          <h2>Blogs</h2>
          <Blogs blogs={blogs} />
        </>
      }
    </div>
  );
}

export default App;
