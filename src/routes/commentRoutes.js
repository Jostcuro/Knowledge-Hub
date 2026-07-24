const { Router } = require("express");
const { body } = require("express-validator");
const commentController = require("../controllers/commentController");
const validate = require("../middleware/validate");

const router = Router();

const commentValidation = [
  body("postId").notEmpty().withMessage("Post ID is required"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ max: 100 })
    .withMessage("Author cannot exceed 100 characters"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 2000 })
    .withMessage("Content cannot exceed 2000 characters"),
];

router.get("/:postId", commentController.getByPostId);
router.post("/", commentValidation, validate, commentController.create);

module.exports = router;
