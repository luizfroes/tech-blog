const renderDashboard = (req, res) => {
  res.send("renderDashboard");
};

const renderMyPosts = (req, res) => {
  res.send("renderMyPosts");
};

module.exports = { renderMyPosts, renderDashboard };
