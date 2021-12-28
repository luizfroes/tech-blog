const { Router } = require("express");

const {
  createNewComment,
  updateCommentsById,
  deleteCommentsById,
} = require("../../controllers/api/comment");

const router = Router();

router.post("/comments/", createNewComment);

router.put("/comments/:id", updateCommentsById);

router.delete("/comments/:id", deleteCommentsById);

module.exports = router;
