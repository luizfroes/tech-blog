// import models
const User = require("./User");
const Blog = require("./Blog");
const Comments = require("./Comments");

// Blog belongs to User
Blog.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many Blog
User.hasMany(Blog, {
  foreignKey: "user_id",
});

// Comments belongs to User
Comments.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many Comments
User.hasMany(Comments, {
  foreignKey: "user_id",
});

// Comments belongs to Blog
Comments.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

// Blog have many Comments
Blog.hasMany(Comments, {
  foreignKey: "blog_id",
});

module.exports = {
  User,
  Blog,
  Comments,
};
