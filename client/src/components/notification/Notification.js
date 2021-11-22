const Notification = (props) => {
  const { notification } = props;

  if (!notification) {
    return <></>;
  }

  return (
    <div className="notification__item">
      <img src={`http://localhost:8080${notification.notification_image}`} alt="notification-avatar" />
      <span>{notification.notification_message}</span>
    </div>
  );
};
export default Notification;