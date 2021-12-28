const { Router } = require("express");

const {
  renderLogin,
  renderSignUp,
  renderHome,
  renderPostById,
} = require("../../controllers/view/publicRoutes");

const router = Router();

router.get("/login", renderLogin);
router.get("/sign-up", renderSignUp);
router.get("/", renderHome);
router.get("/posts/:id", renderPostById);

module.exports = router;
