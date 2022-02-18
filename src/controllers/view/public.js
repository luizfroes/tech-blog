const { Post, User, Comments } = require("../../models");

const renderLogin = (req, res) => {
  res.render("login");
};

const renderHome = async (req, res) => {
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

  const handlebarsData = {
    loggedIn: req.session.loggedIn,
    posts: posts,
  };

  res.render("home", handlebarsData);
};

const renderSignUp = (req, res) => {
  res.render("signup");
};

const renderPostById = async (req, res) => {
  const { id } = req.params;

  const postFromDb = await Post.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: Comments,
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      },
    ],
  });

  if (postFromDb) {
    const post = postFromDb.get({ plain: true });

    return res.render("post", { ...post, loggedIn: req.session.loggedIn });
  }
  return res.render("404page");
};

module.exports = {
  renderHome,
  renderLogin,
  renderSignUp,
  renderPostById,
};
