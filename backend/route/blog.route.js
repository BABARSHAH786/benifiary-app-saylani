// import express from "express";
// import Blog from "../models/Blog.model.js";

// const router = express.Router();

// // CREATE Blog
// router.post("/", async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body);
//     res.status(201).json(blog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // READ All Blogs (Public)
// router.get("/", async (req, res) => {
//   const blogs = await Blog.find().sort({ createdAt: -1 });
//   res.json(blogs);
// });

// // UPDATE Blog
// router.put("/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE Blog
// router.delete("/:id", async (req, res) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.json({ message: "Blog deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


// new for upload image
// route/blog.route.js
import express from "express";
import Blog from "../models/Blog.model.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// CREATE BLOG WITH IMAGE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = new Blog({ title, content, image: imagePath });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL BLOGS
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// UPDATE BLOG WITH IMAGE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const updateData = { title, content };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE BLOG
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

export default router;
