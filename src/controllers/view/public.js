const { Post, User, Comments } = require("../../models");

const renderLogin = (req, res) => {
  res.render("login");
};

const renderHome = async (req, res) => {
  const { loggedIn } = req.session;

  const postsData = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  }).catch((err) => {
    res.json(err);
  });

  const posts = postsData.map((post) => post.get({ plain: true }));

  res.render("home", { loggedIn, posts });
};

const renderSignUp = (req, res) => {
  res.render("signup");
};

const renderPostById = async (req, res) => {
  const { loggedIn } = req.session;

  const data = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
      },
      {
        model: Comments,
      },
    ],
  }).catch((err) => {
    res.json(err);
  });

  const post = data.get({ plain: true });

  console.log(post);
  res.render("post", { loggedIn, post });
};

module.exports = {
  renderHome,
  renderLogin,
  renderSignUp,
  renderPostById,
};
