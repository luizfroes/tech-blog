const { Post, User } = require("../../models");

const renderDashboard = async (req, res) => {
  const userId = req.session.user.id;

  const post = await Post.findAll({
    where: { user_id: userId },
    include: [
      {
        model: User,
      },
    ],
  });

  res.render("dashboard", post);
};

const renderLogout = async (req, res) => {
  res.render("logout");
};

module.exports = { renderLogout, renderDashboard };
