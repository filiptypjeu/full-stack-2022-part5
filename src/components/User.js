import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find(u => u.id === id);

  return !user ? null : <div className="container">
    <h2>Blogs by {user.name}</h2>
    <ListGroup variant="flush">
      {user.blogs.map(b => <ListGroupItem key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></ListGroupItem>)}
    </ListGroup>
  </div>;
};

export default User;
