// // frontend/src/components/AdminPost.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// export default function  AdminPost() {
//   const [posts, setPosts] = useState([]);
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [newPostContent, setNewPostContent] = useState('');
//   const [editingPost, setEditingPost] = useState(null); // Stores the post being edited
//   const [loading, setLoading] = useState(false);

//   // Dummy Admin ID for now. In a real app, you'd get this from authenticated user data.
//   // For testing, you can hardcode an admin ID from your MongoDB.
//   // Replace 'YOUR_ADMIN_ID_HERE' with an actual _id from your Admin collection.
//   const currentAdminId = 'YOUR_ADMIN_ID_HERE'; // *** IMPORTANT: Replace with a real admin ID ***

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get('http://localhost:4001/api/posts');
//       setPosts(data.posts);
//       toast.success('Posts loaded!');
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//       toast.error('Failed to load posts.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddPost = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (!newPostTitle || !newPostContent) {
//       toast.error('Title and content cannot be empty.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await axios.post('http://localhost:4001/api/posts', {
//         title: newPostTitle,
//         content: newPostContent,
//         authorId: currentAdminId, // Send the admin ID with the post
//       });
//       toast.success(data.message);
//       setNewPostTitle('');
//       setNewPostContent('');
//       fetchPosts(); // Refresh the list of posts
//     } catch (err) {
//       console.error('Error adding post:', err);
//       toast.error(err?.response?.data?.message || 'Failed to add post.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (post) => {
//     setEditingPost({ ...post }); // Set the post data to the editing state
//   };

//   const handleUpdatePost = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (!editingPost.title || !editingPost.content) {
//       toast.error('Title and content cannot be empty.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await axios.put(`http://localhost:4001/api/posts/${editingPost._id}`, {
//         title: editingPost.title,
//         content: editingPost.content,
//         isPublished: editingPost.isPublished,
//       });
//       toast.success(data.message);
//       setEditingPost(null); // Clear editing state
//       fetchPosts(); // Refresh the list of posts
//     } catch (err) {
//       console.error('Error updating post:', err);
//       toast.error(err?.response?.data?.message || 'Failed to update post.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeletePost = async (postId) => {
//     if (!window.confirm('Are you sure you want to delete this post?')) {
//       return; // User cancelled
//     }
//     setLoading(true);
//     try {
//       const { data } = await axios.delete(`http://localhost:4001/api/posts/${postId}`);
//       toast.success(data.message);
//       fetchPosts(); // Refresh the list of posts
//     } catch (err) {
//       console.error('Error deleting post:', err);
//       toast.error(err?.response?.data?.message || 'Failed to delete post.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 font-inter">
//       <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Admin Dashboard</h1>

//       {/* Add New Post Section */}
//       <div className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Post</h2>
//         <form onSubmit={handleAddPost}>
//           <div className="mb-4">
//             <label htmlFor="newPostTitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
//             <input
//               type="text"
//               id="newPostTitle"
//               value={newPostTitle}
//               onChange={(e) => setNewPostTitle(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter post title"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="newPostContent" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
//             <textarea
//               id="newPostContent"
//               value={newPostContent}
//               onChange={(e) => setNewPostContent(e.target.value)}
//               rows="5"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
//               placeholder="Write your post content here..."
//               required
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Adding...' : 'Add Post'}
//           </button>
//         </form>
//       </div>

//       {/* Edit Post Section (Conditional Rendering) */}
//       {editingPost && (
//         <div className="bg-yellow-50 p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto border border-yellow-300">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Post</h2>
//           <form onSubmit={handleUpdatePost}>
//             <div className="mb-4">
//               <label htmlFor="editPostTitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
//               <input
//                 type="text"
//                 id="editPostTitle"
//                 value={editingPost.title}
//                 onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="editPostContent" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
//               <textarea
//                 id="editPostContent"
//                 value={editingPost.content}
//                 onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
//                 rows="5"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
//                 required
//               ></textarea>
//             </div>
//             <div className="mb-6 flex items-center">
//               <input
//                 type="checkbox"
//                 id="isPublished"
//                 checked={editingPost.isPublished}
//                 onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
//                 className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="isPublished" className="text-gray-700 text-sm font-bold">Published</label>
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="button"
//                 onClick={() => setEditingPost(null)}
//                 className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 {loading ? 'Updating...' : 'Update Post'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}


//       {/* List of Posts Section */}
//       <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Posts</h2>
//         {loading && <p className="text-center text-gray-600">Loading posts...</p>}
//         {!loading && posts.length === 0 && <p className="text-center text-gray-600">No posts found. Add one above!</p>}
//         <div className="space-y-6">
//           {posts.map((post) => (
//             <div key={post._id} className="border border-gray-200 p-4 rounded-lg shadow-sm">
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
//               <p className="text-gray-700 mb-3">{post.content}</p>
//               <p className="text-sm text-gray-500">
//                 By: {post.authorName} on {new Date(post.createdAt).toLocaleDateString()}
//                 {' | '}
//                 Status: {post.isPublished ? 'Published' : 'Draft'}
//               </p>
//               <div className="mt-4 flex space-x-3">
//                 <button
//                   onClick={() => handleEditClick(post)}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-200"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeletePost(post._id)}
//                   className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-200"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





// post
// frontend/src/components/AdminPost.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AdminPost() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const adminToken = localStorage.getItem('adminToken');
  const adminName = localStorage.getItem('adminName');

  const authAxios = axios.create({
    baseURL: 'http://localhost:4001',
    headers: {
      Authorization: adminToken ? `Bearer ${adminToken}` : '',
    },
    withCredentials: true,
  });

  useEffect(() => {
    if (!adminToken) {
      toast.error('Please log in as an administrator to access the dashboard.');
      navigate('/admin/login');
      return;
    }
    fetchPosts();
  }, [adminToken, navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:4001/api/posts');
      setPosts(data.posts);
      toast.success('Posts loaded!');
    } catch (err) {
      console.error('Error fetching posts:', err);
      toast.error('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!newPostTitle || !newPostContent) {
      toast.error('Title and content cannot be empty.');
      setLoading(false);
      return;
    }
    if (!adminToken) {
      toast.error('Authentication token missing. Please log in again.');
      setLoading(false);
      navigate('/admin/login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newPostTitle);
      formData.append('content', newPostContent);
      if (image) formData.append('image', image);

      const { data } = await authAxios.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(data.message);
      setNewPostTitle('');
      setNewPostContent('');
      setImage(null);
      fetchPosts();
    } catch (err) {
      console.error('Error adding post:', err);
      toast.error(err?.response?.data?.message || 'Failed to add post.');
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (post) => {
    setEditingPost({ ...post });
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!editingPost.title || !editingPost.content) {
      toast.error('Title and content cannot be empty.');
      setLoading(false);
      return;
    }
    if (!adminToken) {
      toast.error('Authentication token missing. Please log in again.');
      setLoading(false);
      navigate('/admin/login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', editingPost.title);
      formData.append('content', editingPost.content);
      formData.append('isPublished', editingPost.isPublished);
      if (editingPost.newImage) formData.append('image', editingPost.newImage);

      const { data } = await authAxios.put(`/api/posts/${editingPost._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(data.message);
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      console.error('Error updating post:', err);
      toast.error(err?.response?.data?.message || 'Failed to update post.');
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    setLoading(true);
    if (!adminToken) {
      toast.error('Authentication token missing. Please log in again.');
      setLoading(false);
      navigate('/admin/login');
      return;
    }

    try {
      const { data } = await authAxios.delete(`/api/posts/${postId}`);
      toast.success(data.message);
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error(err?.response?.data?.message || 'Failed to delete post.');
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-inter">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Admin Dashboard</h1>
      {adminName && <p className="text-center text-gray-600 mb-8">Logged in as: <span className="font-semibold">{adminName}</span></p>}

      {/* Add New Post Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Post</h2>
        <form onSubmit={handleAddPost}>
          <div className="mb-4">
            <label htmlFor="newPostTitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="newPostTitle"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full" />
          </div>
          <div className="mb-6">
            <label htmlFor="newPostContent" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              id="newPostContent"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows="5"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
              placeholder="Write your post content here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading || !adminToken}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ${loading || !adminToken ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding...' : 'Add Post'}
          </button>
        </form>
      </div>

      {/* Edit Post Section */}
      {editingPost && (
        <div className="bg-yellow-50 p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto border border-yellow-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Post</h2>
          <form onSubmit={handleUpdatePost}>
            <div className="mb-4">
              <label htmlFor="editPostTitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                id="editPostTitle"
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editImage" className="block text-gray-700 text-sm font-bold mb-2">Change Image</label>
              <input type="file" id="editImage" accept="image/*" onChange={(e) => setEditingPost({ ...editingPost, newImage: e.target.files[0] })} className="w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="editPostContent" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
              <textarea
                id="editPostContent"
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={editingPost.isPublished}
                onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="text-gray-700 text-sm font-bold">Published</label>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => setEditingPost(null)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
                Cancel
              </button>
              <button type="submit" disabled={loading} className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? 'Updating...' : 'Update Post'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List of Posts Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Posts</h2>
        {loading && <p className="text-center text-gray-600">Loading posts...</p>}
        {!loading && posts.length === 0 && <p className="text-center text-gray-600">No posts found. Add one above!</p>}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="border border-gray-200 p-4 rounded-lg shadow-sm">
              {post.image && <img src={`http://localhost:4001${post.image}`} alt={post.title} className="w-full max-h-64 object-cover rounded mb-3" />}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-3">{post.content}</p>
              <p className="text-sm text-gray-500">
                By: {post.authorName} on {new Date(post.createdAt).toLocaleDateString()} | Status: {post.isPublished ? 'Published' : 'Draft'}
              </p>
              <div className="mt-4 flex space-x-3">
                <button onClick={() => handleEditClick(post)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg text-sm">
                  Edit
                </button>
                <button onClick={() => handleDeletePost(post._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
