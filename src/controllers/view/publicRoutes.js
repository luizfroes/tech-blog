const renderLogin = (req, res) => {
  res.send("renderLogin");
};

const renderHome = (req, res) => {
  res.send("renderHome");
};

const renderSignUp = (req, res) => {
  res.send("renderSignUp");
};

module.exports = {
  renderHome,
  renderLogin,
  renderSignUp,
};
