import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <i>{blog.title}</i> by {blog.author} <button onClick={() => setShow(!show)}>{show ? "hide" : "view"}</button>
      { show && <>
        <br />{blog.url}
        <br />Likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        { blog.user.name &&
              <>
                <br />Added by {blog.user.name}
              </>
        }
        { (user.id === blog.user || user.id === blog.user.id) &&
              <>
                <br /><button onClick={() => handleRemove(blog)}>remove</button>
              </>
        }
      </>
      }
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
