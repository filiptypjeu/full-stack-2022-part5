import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [show, setShow] = useState(false);
  const user = useSelector(state => state.user);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog container">
      <Link to={`/blogs/${blog.id}`}><i>{blog.title}</i></Link> by {blog.author} <Button onClick={() => setShow(!show)} variant={show ? "outline-primary" : "primary"}>{show ? "hide" : "view"}</Button>
      {show && (
        <>
          <br />
          {blog.url}
          <br />
          Likes: {blog.likes} <Button variant="success" onClick={() => handleLike(blog)}>like</Button>
          {blog.user.name && (
            <>
              <br />
              Added by {blog.user.name}
            </>
          )}
          {(user.id === blog.user || user.id === blog.user.id) && (
            <>
              <br />
              <Button variant="danger" onClick={() => handleRemove(blog)}>remove</Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
