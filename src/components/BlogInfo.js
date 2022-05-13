import { useState } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { commentBlog, likeBlog } from "../reducers/blogReducer";
import { setError, setNotification } from "../reducers/notificationReducer";

const BlogInfo = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(b => b.id === id);

  const [comment, setComment] = useState("");

  const handleInput = e => setComment(e.target.value || "");
  const handleComment = async e => {
    if (!comment) return;
    setComment("");
    try {
      await dispatch(commentBlog(blog, comment));
      dispatch(setNotification("Comment added"));
    } catch (e) {
      dispatch(setError("Could not add comment"));
    }
  };

  return !blog ? null : <>
    <div className="container">
      <h2><i>{blog.title}</i> by {blog.author}</h2>
      URL: <a href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <Button variant="success" onClick={() => dispatch(likeBlog(blog))}>like</Button><br />
      Added by {blog.user.name}
    </div>

    <div className="container">
      <h3>Write a comment</h3>
      <Form.Control type="text" value={comment} onChange={handleInput} />
      <Button onClick={handleComment}>add comment</Button>
    </div>

    <div className="container">
      <h3>Comments</h3>
      <ListGroup variant="flush">
        {blog.comments.map(c => <ListGroupItem key={c}>{c}</ListGroupItem>)}
      </ListGroup>
    </div>
  </>;
};

export default BlogInfo;
