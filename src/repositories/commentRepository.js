const Comment = require("../models/Comment");

const commentRepository = {
  async findByPostId(postId) {
    return Comment.find({ postId }).sort({ createdAt: -1 }).lean();
  },

  async create(data) {
    const comment = new Comment(data);
    return comment.save();
  },

  async deleteMany(filter = {}) {
    return Comment.deleteMany(filter);
  },
};

module.exports = commentRepository;
