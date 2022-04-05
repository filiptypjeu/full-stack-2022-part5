import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title && !author && !url) return;
    handleCreateBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>title: <input value={title} onChange={({ target }) => setTitle(target.value)} /></div>
        <div>author: <input value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>url: <input value={url} onChange={({ target }) => setUrl(target.value)} /></div>
        <div><button type="submit">create</button></div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
};

export default BlogForm;
