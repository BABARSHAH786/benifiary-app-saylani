import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4001/api/blogs";

export default function AdminDashboardblog() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    const res = await axios.get(API_URL);
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    setFormData({ title: "", content: "" });
    setEditingId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content });
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchBlogs();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Blog Dashboard</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 flex flex-col gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Blog Title"
          className="p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Blog Content"
          className="p-2 border rounded h-32"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-lg p-5 rounded">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-700 mt-2">{blog.content}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(blog)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
