const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();

router.get("/search", postController.search);
router.get("/featured", postController.getFeatured);
router.get("/category/:category", postController.getByCategory);
router.get("/:slug/related", postController.getRelated);
router.get("/:slug", postController.getBySlug);
router.get("/", postController.getAll);

module.exports = router;
