const { Router } = require("express");

const {
  login,
  signup,
  logout,
  createNewPost,
  updatePostById,
  deletePostById,
  createNewComment,
  updateCommentsById,
  deleteCommentsById,
} = require("../../controllers/auth/auth");

const router = Router();

router.post("/posts", createNewPost);
router.put("/posts/:id", updatePostById);
router.delete("/posts/:id", deletePostById);

router.post("/comments", createNewComment);
router.put("/comments/:id", updateCommentsById);
router.delete("/comments/:id", deleteCommentsById);

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;
