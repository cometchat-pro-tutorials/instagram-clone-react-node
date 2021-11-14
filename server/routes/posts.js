module.exports = function ({ app, dbConn, upload }) {
  app.post('/posts', upload.single('post_image'), (req, res) => {
    const file = req.file;
    if (!file) {
      res.status(200).jsonp({
        message: "Please upload your post image",
      });
    } else {
      const postContent = `/${file.filename}`;
      const postCategory = req.file && req.file.mimetype.includes('image') ? 1 : 2;
      const postCreatedDate = new Date();
      const postCreatedBy = req.body.post_created_by;
      if (postCreatedBy) {
        const createdPost = [[postContent, postCategory, postCreatedDate, postCreatedBy]];
        const createPostSql = "INSERT INTO post (post_content, post_category, post_created_date, post_created_by) VALUES ?";
        dbConn.query(createPostSql, [createdPost], function (error, insertedPost) {
          if (insertedPost) {
            res.status(200).jsonp({ id: insertedPost.insertId, post_content: postContent, post_category: postCategory, post_created_date: postCreatedDate, post_created_by: postCreatedBy });
          } else {
            res.status(200).jsonp({ message: 'Cannot upload your post, please try again' });
          }
        });
      } else {
        res.status(200).jsonp({ message: 'Cannot upload your post, please try again' });
      }
    }
  });

  app.get('/posts', (req, res) => {
    const getPostsSql = "SELECT * FROM post";
    dbConn.query(getPostsSql, function (error, posts) {
      if (posts) {
        res.status(200).jsonp(posts);
      } else {
        res.status(200).jsonp({ message: 'Cannot get your posts, please try again' });
      }
    });
  });
}