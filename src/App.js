import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import userService from "./services/users";
import { initalizeBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser, logout } from "./reducers/userReducer";
import Blogs from "./components/Blogs";
import Menu from "./components/Menu";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const a = await userService.getAll();
    setUsers(a);
  }, []);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initalizeBlogs());
  }, [dispatch]);

  return (
    <Router>
      <Notification />

      {!user ? (
        <LoginForm />
      ) : (
        <>
          <Menu />
          <p>
            {user.name || user.username} logged in
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>

          <Routes>
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/" element={<Blogs />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
