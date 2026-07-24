const subscriberRepository = require("../repositories/subscriberRepository");

const subscriberService = {
  async subscribe(email) {
    if (!email) {
      throw Object.assign(new Error("Email is required"), { statusCode: 400 });
    }

    const existing = await subscriberRepository.findByEmail(email);
    if (existing) {
      throw Object.assign(new Error("Email is already subscribed"), {
        statusCode: 409,
      });
    }

    return subscriberRepository.create(email);
  },
};

module.exports = subscriberService;
