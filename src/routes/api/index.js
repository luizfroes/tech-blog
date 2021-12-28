const { Router } = require("express");

const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./CommentRoutes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
