import { useState } from "react";
import { login } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { setError } from "../reducers/notificationReducer";
import { Button, Form } from "react-bootstrap";

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
      dispatch(setError("Wrong credentials"));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          <Form.Label>password:</Form.Label>
          <Form.Control id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          <Button variant="success" type="submit" id="login-button">login</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
