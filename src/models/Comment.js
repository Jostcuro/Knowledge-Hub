const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
      index: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      maxlength: [2000, "Comment cannot exceed 2000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
