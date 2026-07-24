const postService = require("../services/postService");

const postController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const result = await postService.getAll(page, limit);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req, res, next) {
    try {
      const post = await postService.getBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ success: false, error: "Post not found" });
      }
      res.json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  },

  async search(req, res, next) {
    try {
      const posts = await postService.search(req.query.q);
      res.json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  },

  async getByCategory(req, res, next) {
    try {
      const posts = await postService.getByCategory(req.params.category);
      res.json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  },

  async getFeatured(req, res, next) {
    try {
      const posts = await postService.getFeatured();
      res.json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  },

  async getRelated(req, res, next) {
    try {
      const posts = await postService.getRelated(req.params.slug);
      res.json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;
