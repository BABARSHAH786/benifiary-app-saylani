// import express from 'express';
// import { createPost, getPosts, getPostById, updatePost, deletePost } 
// from '../controllers/postController.js'; // ✅ Correct path

// const router = express.Router();

// router.post('/', createPost);
// router.get('/', getPosts);
// router.get('/:id', getPostById);
// router.put('/:id', updatePost);
// router.delete('/:id', deletePost);

// export default router;


// route/post.route.js



// new
import express from "express";
import Post from "../models/postModel.js";       // Make sure this file exists
import upload from "../middleware/upload.js";    // Handles file uploads
import { protectAdmin } from "../middleware/authPost.js"; // JWT middleware

const router = express.Router();

/**
 * @route   GET /api/posts
 * @desc    Get all posts
 * @access  Public (you can add protectAdmin if you want it private)
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // latest first
    res.json({ posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/posts
 * @desc    Create new post
 * @access  Admin (Protected)
 */
router.post("/", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // If image uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      title,
      content,
      image,
      author: req.admin._id,       // From token
      authorName: req.admin.name,  // Optional
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   PUT /api/posts/:id
 * @desc    Update post
 * @access  Admin (Protected)
 */
router.put("/:id", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;
    const updateData = { title, content, isPublished };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete post
 * @access  Admin (Protected)
 */
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
