import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const padding = {
    paddingRight: 5,
  };
  const navigation = {
    backgroundColor: "lightgray",
    padding: 4,
  };
  return (
    <div style={navigation}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name || user.username} logged in <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
};

export default Menu;
