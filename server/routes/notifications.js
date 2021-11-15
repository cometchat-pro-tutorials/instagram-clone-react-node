module.exports = function ({ app, dbConn }) {
  app.post('/notifications/create', (req, res) => {
    const { notificationImage, notificationMessage, userId } = req.body;
    if (!notificationImage || !notificationMessage || !userId) {
      res.status(200).jsonp({ message: 'Cannot creat the notification, please try again' });
    }
    const createNotification = [[notificationImage, notificationMessage, userId]];
    const createNotificationSql = "INSERT INTO user_notification (notification_image, notification_message, user_id) VALUES ?";
    dbConn.query(createNotificationSql, [createNotification], function (error, insertedNotification) {
      if (insertedNotification) {
        res.status(200).jsonp({ id: insertedNotification.insertId, notification_image: notificationImage, notification_message: notificationMessage, user_id: userId });
      } else {
        res.status(200).jsonp({ message: 'Cannot creat the notification, please try again' });
      }
    });
  });

  app.get('/notifications/:id', (req, res) => {
    const userId = req.params.id;
    const getNotificationsSql = "SELECT * FROM user_notification WHERE user_id = ? ORDER BY id DESC";
    dbConn.query(getNotificationsSql, [userId], function (error, notifications) {
      if (notifications) {
        res.status(200).jsonp(notifications);
      } else {
        res.status(200).jsonp({ message: 'Cannot get your notifications, please try again' });
      }
    });
  });
}