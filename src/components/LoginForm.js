import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ handleNotification, handleLogin }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      });
      setUsername("");
      setPassword("");
      handleLogin(user);
    } catch (exception) {
      handleNotification("Wrong credentials", true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in to application</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
