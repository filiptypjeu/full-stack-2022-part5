import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

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

      <Form onSubmit={handleSubmit} className="blogForm">
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control id="title" value={title} onChange={({ target }) => setTitle(target.value)} placeholder="title" />

          <Form.Label>author:</Form.Label>
          <Form.Control id="author" value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="author" />

          <Form.Label>url:</Form.Label>
          <Form.Control id="url" value={url} onChange={({ target }) => setUrl(target.value)} placeholder="url" />

          <Button variant="success" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
};

export default BlogForm;
