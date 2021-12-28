const { Router } = require("express");

const {
  createNewPost,
  updatePostById,
  deletePostById,
} = require("../../controllers/auth/post");

const router = Router();

router.post("/posts", createNewPost);

router.put("/posts/:id", updatePostById);

router.delete("/posts/:id", deletePostById);

module.exports = router;
