import { useState } from "react";
import { login } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    setUsername("");
    setPassword("");

    try {
      await dispatch(login(username, password));
    } catch (e) {
      dispatch(setNotification("Wrong credentials", 3, true));
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

export default LoginForm;
