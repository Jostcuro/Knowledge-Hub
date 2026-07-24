const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: ["Frontend", "Backend", "DevOps", "IA"],
        message: "Category must be Frontend, Backend, DevOps, or IA",
      },
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    readingTime: {
      type: Number,
      default: 1,
    },
    views: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ title: "text", tags: "text" });

postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.isModified("content")) {
    const words = this.content.split(/\s+/).length;
    this.readingTime = Math.max(1, Math.ceil(words / 200));
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
