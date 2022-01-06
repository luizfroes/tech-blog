const { Post, User } = require("../../models");

const renderDashboard = async (req, res) => {
  const userPostsData = await Post.findAll({
    where: { user_id: req.session.user.id },
    include: [
      {
        model: User,
      },
    ],
  }).catch((err) => {
    res.json(err);
  });

  const userPosts = userPostsData.map((userPost) =>
    userPost.get({ plain: true })
  );

  console.log(userPosts);
  res.render("dashboard", { userPosts });
};

const renderLogout = async (req, res) => {
  res.render("logout");
};

module.exports = { renderLogout, renderDashboard };
