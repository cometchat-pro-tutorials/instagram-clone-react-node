const authRoutes = require("./auth");
const userRoutes = require("./users");
const followerRoutes = require("./followers");
const notificationRoutes = require("./notifications");
const postRoutes = require("./posts");
const reactionRoutes = require("./reactions");

module.exports = function ({ app, dbConn, upload }) {
  authRoutes({ app, dbConn });
  userRoutes({ app, dbConn, upload });
  followerRoutes({ app, dbConn });
  notificationRoutes({ app, dbConn });
  postRoutes({ app, dbConn, upload });
  reactionRoutes({ app, dbConn });
};