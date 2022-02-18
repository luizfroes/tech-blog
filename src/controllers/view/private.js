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

  const handlebarsData = {
    loggedIn: req.session.loggedIn,
    user: req.session.user,
    blogCount: userPosts.length,
    posts: userPosts,
  };

  res.render("dashboard", handlebarsData);
};

const renderLogout = async (req, res) => {
  res.render("logout");
};

module.exports = { renderLogout, renderDashboard };
