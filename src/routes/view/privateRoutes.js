const { Router } = require("express");

const {
  renderDashboard,
  renderLogout,
} = require("../../controllers/view/private");

const router = Router();

router.get("/dashboard", renderDashboard);
router.get("/logout", renderLogout);

module.exports = router;
