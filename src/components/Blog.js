import React from "react";

const Blog = ({blog}) => (
  <li>
    <i>{blog.title}</i> by {blog.author}
  </li>
)

export default Blog;
