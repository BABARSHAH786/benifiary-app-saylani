// backend/models/postModel.js
import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    // Title of the post (e.g., Blog Post Title, Announcement Title)
    title: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends of a string
      minlength: 3, // Minimum length for the title
      maxlength: 100, // Maximum length for the title
    },
    // Content/body of the post
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10, // Minimum length for the content
    },
    // Reference to the Admin who created the post
    // This assumes you have an Admin model with ObjectId
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Admin', // Refers to your Admin model
    },
    // Name of the author (for display purposes, can be denormalized)
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    // Optional: A flag to indicate if the post is published or a draft
    isPublished: {
      type: Boolean,
      default: true, // Posts are published by default
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
