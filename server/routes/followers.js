module.exports = function({ app, dbConn }) {
  app.post('/followers/get', (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res.status(200).jsonp({ message: 'Not found' });
    }
    const getFollowerSql = "SELECT * FROM user_follower WHERE follower_id = ? AND user_id = ?";
    dbConn.query(getFollowerSql, [followerId, userId], function (error, response) { 
      if (response && response.length) { 
        res.status(200).jsonp({ ...response[0] });
      } else { 
        res.status(200).jsonp({ message: 'Not found' });
      }
    });
  });

  app.post('/followers/create', (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res.status(200).jsonp({ message: 'Cannot create the follower, please try again' });
    }
    const followers = [[followerId, userId]];
    const insertFollowerSql = "INSERT INTO user_follower (follower_id, user_id) VALUES ?";
    dbConn.query(insertFollowerSql, [followers], function (error, insertedFollower) {
      if (insertedFollower) {
        res.status(200).jsonp({ insertId: insertedFollower.insertId, follower_id: followerId, user_id: userId });
      } else {
        res.status(200).jsonp({ message: 'Cannot create the follower, please try again' });
      }
    });
  });

  app.post('/followers/delete', (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res.status(200).jsonp({ message: 'Cannot delete the follower, please try again' });
    }
    const deleteFollowerSql  = "DELETE FROM user_follower WHERE follower_id = ? AND user_id = ?";
    dbConn.query(deleteFollowerSql, [followerId, userId], function (error, response) {
      if (response && response.affectedRows) {
        res.status(200).jsonp({ followerId, userId });
      } else {
        res.status(200).jsonp({ message: 'Cannot delete the follower, please try again' });
      }
    });
  });
}