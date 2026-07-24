const Subscriber = require("../models/Subscriber");

const subscriberRepository = {
  async findByEmail(email) {
    return Subscriber.findOne({ email }).lean();
  },

  async create(email) {
    const subscriber = new Subscriber({ email });
    return subscriber.save();
  },

  async countDocuments() {
    return Subscriber.countDocuments();
  },
};

module.exports = subscriberRepository;
