const createNewPost = (req, res) => {
  res.send("createNewPost");
};

const updatePostById = (req, res) => {
  res.send("updatePostById");
};

const deletePostById = (req, res) => {
  res.send("deletePostById");
};

module.exports = {
  createNewPost,
  updatePostById,
  deletePostById,
};
