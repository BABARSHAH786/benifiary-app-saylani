// // backend/controllers/postController.js
// import Post from '../model/postModel.js'; // Adjust path if necessary
// import Admin from '../model/adminModelAb.js'; // Assuming this is your Admin model

// // @desc    Create a new post
// // @route   POST /api/posts
// // @access  Private (Admin only) - You'll add middleware for this later
// export const createPost = async (req, res) => {
//   try {
//     const { title, content, authorId } = req.body; // Expect authorId from frontend

//     // Basic validation
//     if (!title || !content || !authorId) {
//       return res.status(400).json({ message: 'Title, content, and author ID are required.' });
//     }

//     // Find the admin to get their name (for denormalization)
//     const admin = await Admin.findById(authorId);
//     if (!admin) {
//       return res.status(404).json({ message: 'Author (Admin) not found.' });
//     }

//     const post = await Post.create({
//       title,
//       content,
//       author: authorId,
//       authorName: admin.name, // Store admin's name directly in the post
//     });

//     res.status(201).json({
//       message: 'Post created successfully',
//       post,
//     });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };

// // @desc    Get all posts
// // @route   GET /api/posts
// // @access  Public
// export const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({}).sort({ createdAt: -1 }); // Sort by newest first
//     res.status(200).json({ posts });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };

// // @desc    Get a single post by ID
// // @route   GET /api/posts/:id
// // @access  Public
// export const getPostById = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found.' });
//     }
//     res.status(200).json({ post });
//   } catch (error) {
//     console.error('Error fetching post by ID:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };

// // @desc    Update a post
// // @route   PUT /api/posts/:id
// // @access  Private (Admin only)
// export const updatePost = async (req, res) => {
//   try {
//     const { title, content, isPublished } = req.body;
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found.' });
//     }

//     // Update fields if provided
//     if (title !== undefined) post.title = title;
//     if (content !== undefined) post.content = content;
//     if (isPublished !== undefined) post.isPublished = isPublished;

//     const updatedPost = await post.save();

//     res.status(200).json({
//       message: 'Post updated successfully',
//       post: updatedPost,
//     });
//   } catch (error) {
//     console.error('Error updating post:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };

// // @desc    Delete a post
// // @route   DELETE /api/posts/:id
// // @access  Private (Admin only)
// export const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found.' });
//     }

//     await Post.deleteOne({ _id: req.params.id }); // Use deleteOne with query

//     res.status(200).json({ message: 'Post removed successfully.' });
//   } catch (error) {
//     console.error('Error deleting post:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };


// chatgtp
// backend/controllers/postController.js
import Post from '../models/postModel.js'; // Adjust path if necessary
import Admin from '../models/adminModelAb.js'; // Assuming this is your Admin model

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private (Admin only) - Now truly enforced by middleware
export const createPost = async (req, res) => { // Changed to named export
  try {
    const { title, content } = req.body;
    // The admin's ID and name now come from the `req.admin` object,
    // which is populated by the 'protect' middleware after token verification.
    const authorId = req.admin._id;
    const authorName = req.admin.name; // Assuming your admin model has a 'name' field

    // Basic validation for title and content (authorId is guaranteed by middleware)
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    // Debugging: Log admin info before creating post
    console.log('Attempting to create post by Admin:', authorName, 'ID:', authorId);

    const post = await Post.create({
      title,
      content,
      author: authorId,      // Use the ID from the authenticated admin
      authorName: authorName, // Use the name from the authenticated admin
    });

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => { // Changed to named export
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => { // Changed to named export
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(200).json({ post });
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Admin only) - Now truly enforced by middleware
export const updatePost = async (req, res) => { // Changed to named export
  try {
    const { title, content, isPublished } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Debugging: Log values before comparison
    console.log('Updating post:', post._id);
    console.log('Post Author ID (from DB):', post.author);
    console.log('Request Admin ID (from token):', req.admin._id);

    // Check if the logged-in admin is the author of the post
    // Ensure both are converted to strings for reliable comparison
    if (post.author.toString() !== req.admin._id.toString()) {
      console.log('Authorization failed: Post author and request admin ID do not match.');
      return res.status(403).json({ message: 'Not authorized to update this post.' });
    }

    // Update fields if provided
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (isPublished !== undefined) post.isPublished = isPublished;

    const updatedPost = await post.save();

    res.status(200).json({
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Admin only) - Now truly enforced by middleware
export const deletePost = async (req, res) => { // Changed to named export
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Debugging: Log values before comparison
    console.log('Deleting post:', post._id);
    console.log('Post Author ID (from DB):', post.author);
    console.log('Request Admin ID (from token):', req.admin._id);

    // Check if the logged-in admin is the author of the post
    // Ensure both are converted to strings for reliable comparison
    if (post.author.toString() !== req.admin._id.toString()) {
      console.log('Authorization failed: Post author and request admin ID do not match.');
      return res.status(403).json({ message: 'Not authorized to delete this post.' });
    }

    await Post.deleteOne({ _id: req.params.id }); // Use deleteOne with query

    res.status(200).json({ message: 'Post removed successfully.' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
