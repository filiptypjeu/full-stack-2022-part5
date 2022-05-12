import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {/* <a style={padding} href="" onClick={() => console.log("logout")}>logout</a> */}
    </div>
  );
};

export default Menu;
