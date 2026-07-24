const subscriberService = require("../services/subscriberService");

const subscriberController = {
  async subscribe(req, res, next) {
    try {
      await subscriberService.subscribe(req.body.email);
      res.status(201).json({ success: true, message: "Successfully subscribed" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = subscriberController;
