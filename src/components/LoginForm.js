import { useState } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";

const LoginForm = ({ handleNotification, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUsername("");
      setPassword("");
      handleLogin(user);
    } catch (exception) {
      handleNotification("Wrong credentials", true);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleNotification: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
