const { Router } = require("express");
const postService = require("../services/postService");
const commentService = require("../services/commentService");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const [featured, latest, stats] = await Promise.all([
      postService.getFeatured(),
      postService.getAll(page, 10),
      postService.getStats(),
    ]);
    const categories = stats.categories;

    res.render("index", {
      featured,
      latest: latest.data,
      pagination: latest.pagination,
      categories,
      currentPage: page,
      query: null,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/post/:slug", async (req, res, next) => {
  try {
    const post = await postService.getBySlug(req.params.slug);
    if (!post) return res.status(404).render("404");

    const [related, comments] = await Promise.all([
      postService.getRelated(req.params.slug),
      commentService.getByPostId(post._id),
    ]);

    res.render("post", { post, related, comments });
  } catch (error) {
    next(error);
  }
});

router.get("/category/:category", async (req, res, next) => {
  try {
    const posts = await postService.getByCategory(req.params.category);
    res.render("category", {
      posts,
      category: req.params.category,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const posts = await postService.search(req.query.q);
    res.render("search", { posts, query: req.query.q || "" });
  } catch (error) {
    next(error);
  }
});

router.get("/dashboard", async (req, res, next) => {
  try {
    const stats = await postService.getStats();
    res.render("dashboard", { stats });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
