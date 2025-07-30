import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-lg p-5 rounded">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-700 mt-2">{blog.content}</p>
            <span className="text-sm text-gray-500">
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
