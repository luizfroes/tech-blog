// import models
const User = require("./User");
const Comments = require("./Comments");
const Post = require("./Post");

// Blog belongs to User
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many Blog
User.hasMany(Post, {
  foreignKey: "user_id",
});

// Comments belongs to Blog
Comments.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Blog have many Comments
Post.hasMany(Comments, {
  foreignKey: "post_id",
});

// Comments belongs to User
Comments.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many Comments
User.hasMany(Comments, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Post,
  Comments,
};
