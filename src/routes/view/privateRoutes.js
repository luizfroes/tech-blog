const { Router } = require("express");

const {
  renderDashboard,
  renderMyPosts,
} = require("../../controllers/view/private");

const router = Router();

router.get("/dashboard/", renderDashboard);
router.get("/my-posts", renderMyPosts);

module.exports = router;
