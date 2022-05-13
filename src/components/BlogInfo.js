import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";

const BlogInfo = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(b => b.id === id);

  return !blog ? null : <>
    <h2><i>{blog.title}</i> by {blog.author}</h2>
    <a href={blog.url}>{blog.url}</a><br />
    {blog.likes} likes <button onClick={() => dispatch(likeBlog(blog))}>like</button><br />
    added by {blog.user.name}
  </>;
};

export default BlogInfo;
