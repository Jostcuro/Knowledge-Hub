const Post = require("../models/Post");

const postRepository = {
  async findAll({ page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Post.countDocuments(),
    ]);
    return { data, total, page, limit };
  },

  async findBySlug(slug) {
    return Post.findOne({ slug }).lean();
  },

  async search(query) {
    return Post.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .lean();
  },

  async findByCategory(category) {
    return Post.find({ category }).sort({ createdAt: -1 }).lean();
  },

  async findFeatured() {
    return Post.find({ featured: true }).sort({ createdAt: -1 }).lean();
  },

  async findRelated(currentId, category, tags) {
    return Post.find({
      _id: { $ne: currentId },
      $or: [{ category }, { tags: { $in: tags } }],
    })
      .limit(5)
      .lean();
  },

  async incrementViews(slug) {
    return Post.findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { new: true });
  },

  async getStats() {
    const [totalPosts, totalViews, mostViewed, categoryStats] = await Promise.all([
      Post.countDocuments(),
      Post.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      Post.findOne().sort({ views: -1 }).lean(),
      Post.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 }, totalViews: { $sum: "$views" } } },
        { $sort: { totalViews: -1 } },
      ]),
    ]);

    return {
      totalPosts,
      totalViews: totalViews[0]?.total || 0,
      mostViewed,
      categories: categoryStats,
    };
  },

  async countDocuments(filter = {}) {
    return Post.countDocuments(filter);
  },

  async create(postData) {
    const post = new Post(postData);
    return post.save();
  },

  async deleteMany(filter = {}) {
    return Post.deleteMany(filter);
  },
};

module.exports = postRepository;
