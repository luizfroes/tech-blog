const { Post, User } = require("../../models");

const renderDashboard = async (req, res) => {
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

module.exports = { renderMyPosts, renderDashboard };
