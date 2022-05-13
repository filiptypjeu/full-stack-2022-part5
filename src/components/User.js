import { Link, useParams } from "react-router-dom";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find(u => u.id === id);

  return !user ? null : <>
    <h2>{user.name}</h2>
    <h3>added blogs</h3>
    <ul>
      {user.blogs.map(b => <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>)}
    </ul>
  </>;
};

export default User;
