const commentService = require("../services/commentService");

const commentController = {
  async getByPostId(req, res, next) {
    try {
      const comments = await commentService.getByPostId(req.params.postId);
      res.json({ success: true, data: comments });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const comment = await commentService.create(req.body);
      res.status(201).json({ success: true, data: comment });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
