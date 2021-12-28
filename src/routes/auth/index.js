const { Router } = require("express");

const { login, signup, logout } = require("../../controllers/api/auth");

const postRoutes = require("./postRoutes");
const commentRoutes = require("./CommentRoutes");

const router = Router();

router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;
