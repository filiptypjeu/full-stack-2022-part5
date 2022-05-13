import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector(state => state.notification.message);
  const isError = useSelector(state => state.notification.isError);

  return <div className="container">
    {message && <Alert variant={isError ? "danger" : "success"}>{message}</Alert>}
  </div>;
};

export default Notification;
