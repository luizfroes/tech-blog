const { Post, User, Comments } = require("../../models");

const renderLogin = (req, res) => {
  res.render("login");
};

const renderHome = (req, res) => {
  const { loggedIn } = req.session;
  res.render("home", { loggedIn });
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
