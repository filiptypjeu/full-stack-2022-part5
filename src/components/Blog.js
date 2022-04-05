import { useState } from "react";

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
    <div style={blogStyle}>
      <i>{blog.title}</i> <button onClick={() => setShow(!show)}>{show ? "hide" : "view"}</button>
      { show && <>
            <br />by {blog.author}
            <br />{blog.url}
            <br />Likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
            { user.username === blog.user.username &&
              <>
                <br /><button onClick={() => handleRemove(blog)}>remove</button>
              </>
            }
          </>
      }
    </div>
  );
}

export default Blog;
