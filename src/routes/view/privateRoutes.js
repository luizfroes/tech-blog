const { Router } = require("express");

const {
  renderDashboard,
  renderMyPosts,
  renderLogout,
} = require("../../controllers/view/private");

const router = Router();

router.get("/dashboard", renderDashboard);
router.get("/my-posts", renderMyPosts);
router.get("/logout", renderLogout);

module.exports = router;
