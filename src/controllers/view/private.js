const { Post, User } = require("../../models");

const renderDashboard = async (req, res) => {
  res.render("dashboard");
};

const getAllPosts = async (req, res) => {
  const data = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  });
  return res.json({ success: true, data });
};

const renderMyPosts = (req, res) => {
  res.send("renderMyPosts");
};

const renderLogout = async (req, res) => {
  res.render("logout");
};

module.exports = { renderLogout, renderMyPosts, renderDashboard };
