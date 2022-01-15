const { Router } = require("express");

const {
  renderLogin,
  renderSignUp,
  renderHome,
  renderPostById,
} = require("../../controllers/view/public");

const router = Router();

router.get("/login", renderLogin);
router.get("/sign-up", renderSignUp);
router.get("/posts/:id", renderPostById);
router.get("/", renderHome);

module.exports = router;
