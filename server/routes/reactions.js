module.exports = function ({ app, dbConn }) {
  app.post('/reactions/get', (req, res) => {
    const { post_id, user_id } = req.body;
    if (!post_id || !user_id) {
      res.status(200).jsonp({ message: 'Not found' });
    }
    const getReactionSql = "SELECT * FROM post_reaction WHERE post_id = ? AND user_id = ?";
    dbConn.query(getReactionSql, [post_id, user_id], function (error, response) {
      if (response && response.length) {
        res.status(200).jsonp({ ...response[0] });
      } else {
        res.status(200).jsonp({ message: 'Not found' });
      }
    });
  });

  app.post('/reactions/create', (req, res) => {
    const { postId, userId } = req.body;
    if (!postId || !userId) {
      res.status(200).jsonp({ message: 'Cannot create the post reaction, please try again' });
    }
    const reactions = [[postId, userId]];
    const insertReactionSql = "INSERT INTO post_reaction (post_id, user_id) VALUES ?";
    dbConn.query(insertReactionSql, [reactions], function (error, insertedReaction) {
      if (insertedReaction) {
        res.status(200).jsonp({ insertId: insertedReaction.insertId, post_id: postId, user_id: userId });
      } else {
        res.status(200).jsonp({ message: 'Cannot create the post reaction, please try again' });
      }
    });
  });

  app.post('/reactions/delete', (req, res) => {
    const { postId, userId } = req.body;
    if (!postId || !userId) {
      res.status(200).jsonp({ message: 'Cannot create the post reaction, please try again' });
    }
    const deleteReactionsSql  = "DELETE FROM post_reaction WHERE post_id = ? AND user_id = ?";
    dbConn.query(deleteReactionsSql, [postId, userId], function (error, response) {
      if (response && response.affectedRows) {
        res.status(200).jsonp({ postId, userId });
      } else {
        res.status(200).jsonp({ message: 'Cannot delete the post reaction, please try again' });
      }
    });
  });
}