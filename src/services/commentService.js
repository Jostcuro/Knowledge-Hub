const commentRepository = require("../repositories/commentRepository");

const commentService = {
  async getByPostId(postId) {
    return commentRepository.findByPostId(postId);
  },

  async create({ postId, author, content }) {
    if (!postId || !author || !content) {
      throw Object.assign(new Error("Post ID, author, and content are required"), {
        statusCode: 400,
      });
    }
    return commentRepository.create({ postId, author, content });
  },
};

module.exports = commentService;
