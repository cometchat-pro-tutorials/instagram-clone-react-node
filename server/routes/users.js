module.exports = function ({ app, dbConn, upload }) {
  app.post("/users/create", upload.single("avatar"), (req, res, next) => {
    const file = req.file;
    if (!file) {
      res.status(200).jsonp({
        message: "Please upload your avatar",
      });
    } else {
      const avatar = `/${file.filename}`;
      const { id, email, password, fullname } = req.body;
      if (email && password && fullname) {
        const findAccountByEmail = "SELECT * FROM user_account WHERE user_email = ?";
        dbConn.query(findAccountByEmail, [email], function (error, account) {
          if (account && account.length !== 0) {
            res.status(200).jsonp({ message: 'The email existed in the system' });
          } else {
            const users = [[id, email, password, fullname, avatar]];
            const registerUserSql = "INSERT INTO user_account (id, user_email, user_password, user_full_name, user_avatar) VALUES ?";
            dbConn.query(registerUserSql, [users], function (error, insertedUser) {
              if (insertedUser) {
                res.status(200).jsonp({ avatar, insertId: insertedUser.insertId });
              } else { 
                res.status(200).jsonp({ message: 'Cannot create your account, please try again' });
              }
            });
          }
        });
      } else {
        return res.status(200).jsonp({ message: "Please input required fields" });
      }
    }
  });

  app.post('/users/followers', (req, res) => {
    const { numberOfFollowers, id } = req.body;
    const updateNumberOfFollowersSql = "UPDATE user_account SET user_number_of_followers = ? WHERE id = ?";
    dbConn.query(updateNumberOfFollowersSql, [numberOfFollowers, id], function (err, updatedUser) {
      if (err) {
        res.status(200).jsonp({ message: "The system error. Please try again" });
      } else if (updatedUser) {
        res.status(200).jsonp({ id });
      }
    });
  });

  app.post('/users/posts', (req, res) => {
    const { numberOfPosts, id } = req.body;
    const updateNumberOfPostsSql = "UPDATE user_account SET user_number_of_posts = ? WHERE id = ?";
    dbConn.query(updateNumberOfPostsSql, [numberOfPosts, id], function (err, updatedUser) {
      if (err) {
        res.status(200).jsonp({ message: "The system error. Please try again" });
      } else if (updatedUser) {
        res.status(200).jsonp({ id });
      }
    });
  });

  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    if (!userId) { 
      res.status(200).jsonp({ message: 'Cannot load user information, please try again' });
    }
    const getUserSql = "SELECT * FROM user_account WHERE id = ?";
    dbConn.query(getUserSql, [userId], function (error, response) {
      if (response && response.length) {
        res.status(200).jsonp(response);
      } else {
        res.status(200).jsonp({ message: 'Cannot load user information, please try again' });
      }
    });
  });
}