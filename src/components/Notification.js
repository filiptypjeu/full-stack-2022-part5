import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector(state => state.notification.message);
  const isError = useSelector(state => state.notification.isError);

  return message ? <div className={`message ${isError ? "error" : "notification"}`}>{message}</div> : null;
};

export default Notification;
