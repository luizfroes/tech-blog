const { Router } = require("express");

const post = require("./post");
const comments = require("./comments");

const router = Router();

router.use(post);
router.use(comments);

module.exports = router;
