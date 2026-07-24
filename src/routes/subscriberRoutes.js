const { Router } = require("express");
const { body } = require("express-validator");
const subscriberController = require("../controllers/subscriberController");
const validate = require("../middleware/validate");

const router = Router();

const subscribeValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
];

router.post("/", subscribeValidation, validate, subscriberController.subscribe);

module.exports = router;
