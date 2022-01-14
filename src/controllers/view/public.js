const { Post, User, Comments } = require("../../models");

const renderLogin = (req, res) => {
  res.render("login");
};

const renderHome = async (req, res) => {
  const { loggedIn } = req.session;

  const PostsData = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  }).catch((err) => {
    res.json(err);
  });

  const posts = PostsData.map((Post) => Post.get({ plain: true }));

  res.render("home", { loggedIn, posts });
};

const renderSignUp = (req, res) => {
  res.render("signup");
};

const renderPostById = async (req, res) => {
  const data = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
      },
      {
        model: Comments,
      },
    ],
  });
  return res.json({ success: true, data });
};

module.exports = {
  renderHome,
  renderLogin,
  renderSignUp,
  renderPostById,
};
