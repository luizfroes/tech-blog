const renderLogin = (req, res) => {
  res.send("renderLogin");
};

const renderHome = (req, res) => {
  res.send("renderHome");
};

const renderSignUp = (req, res) => {
  res.send("renderSignUp");
};

const renderPostById = (req, res) => {
  res.send("renderPostById");
};

module.exports = {
  renderHome,
  renderLogin,
  renderSignUp,
  renderPostById,
};
