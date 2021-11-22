import { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Notification from './Notification';
import Context from '../../context';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const { user, setIsLoading } = useContext(Context);

  let loadNotifications = null;

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications])

  loadNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = `http://localhost:8080/notifications/${user.id}`;
      const response = await axios.get(url);
      setNotifications(() => response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [setIsLoading, user]);

  const renderNotifications = () => {
    if (!notifications || !notifications.length) {
      return <></>;
    }
    return (
      <div className="notifications">
        <h3>Notifications</h3>
        <div className="notifications__container">
          {notifications && notifications.map(notification => <Notification key={notification.id} notification={notification} />)}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div id="header">
        <Header />
      </div>
      {renderNotifications()}
    </div>
  );
};
export default Notifications;