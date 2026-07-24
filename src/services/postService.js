const postRepository = require("../repositories/postRepository");

const postService = {
  async getAll(page = 1, limit = 10) {
    const result = await postRepository.findAll({ page, limit });
    return {
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / result.limit),
      },
    };
  },

  async getBySlug(slug) {
    const post = await postRepository.findBySlug(slug);
    if (!post) return null;
    const updated = await postRepository.incrementViews(slug);
    return updated;
  },

  async search(query) {
    if (!query || query.trim().length === 0) return [];
    return postRepository.search(query.trim());
  },

  async getByCategory(category) {
    return postRepository.findByCategory(category);
  },

  async getFeatured() {
    return postRepository.findFeatured();
  },

  async getRelated(slug) {
    const post = await postRepository.findBySlug(slug);
    if (!post) return [];

    const related = await postRepository.findRelated(
      post._id,
      post.category,
      post.tags
    );

    const scored = related.map((r) => {
      let score = 0;
      if (r.category === post.category) score += 3;
      const sharedTags = r.tags.filter((t) => post.tags.includes(t));
      score += sharedTags.length;
      return { ...r, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 5);
  },

  async getStats() {
    return postRepository.getStats();
  },
};

module.exports = postService;
