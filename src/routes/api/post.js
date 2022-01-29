const { Router } = require("express");

const {
  createNewPost,
  updatePostById,
  deletePostById,
} = require("../../controllers/api/post");

const router = Router();

router.post("/post", createNewPost);
router.put("/post/:id", updatePostById);
router.delete("/post/:id", deletePostById);

module.exports = router;
