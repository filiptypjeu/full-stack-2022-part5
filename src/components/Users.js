import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/users";

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table><tbody>
        <tr><th></th><th>blogs created</th></tr>
        {users.map(u => <tr key={u.id}><td><Link to={`/users/${u.id}`}>{u.name}</Link></td><td>{u.blogs.length}</td></tr>)}
      </tbody></table>
    </div>
  );
};

export default Users;
