// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     today: 0,
//     tokens: 0,
//     completed: 0,
//   });

//   // Fetch dashboard stats from backend (optional: implement route)
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/beneficiary/stats", {
//           withCredentials: true,
//         });
//         setStats(res.data);
//       } catch (error) {
//         console.error("Error fetching stats", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">👋 Welcome, Admin</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <Card title="Total Beneficiaries" value={stats.total} color="blue" />
//         <Card title="Registered Today" value={stats.today} color="green" />
//         <Card title="Tokens Issued" value={stats.tokens} color="purple" />
//         <Card title="Services Completed" value={stats.completed} color="orange" />
//       </div>

//       {/* Actions */}
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
//           onClick={() => window.location.href = "/admin/register"}
//         >
//           ➕ Register New Beneficiary
//         </button>

//         <div className="relative w-full md:w-1/2">
//           <input
//             type="text"
//             placeholder="Search Beneficiary by CNIC"
//             className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:ring-blue-300"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value, color }) => {
//   const colors = {
//     blue: "bg-blue-500",
//     green: "bg-green-500",
//     purple: "bg-purple-500",
//     orange: "bg-orange-500",
//   };

//   return (
//     <div className={`p-4 rounded-lg text-white shadow ${colors[color]}`}>
//       <h2 className="text-sm">{title}</h2>
//       <p className="text-2xl font-semibold">{value}</p>
//     </div>
//   );
// };

// export default AdminDashboard;





// new
// pages/AdminDashboard.jsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) navigate("/admin/login");
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <p>Welcome Admin! 🎉</p>
//     </div>
//   );
// };

// export default AdminDashboard;



// new
// import React, { useEffect, useState } from "react";
// import axios from "../api/axios.js";
// import { motion } from "framer-motion";
// import { FaUsers, FaUserTie, FaClipboardList } from "react-icons/fa";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalBeneficiaries: 0,
//     todayBeneficiaries: 0,
//     totalReceptionists: 0,
//   });

//   // ✅ Fetch Stats from Backend
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get("/api/receptionist/stats/today"); 
//         // You can create more APIs for total counts
//         setStats({
//           totalBeneficiaries: 120, // mock until API ready
//           todayBeneficiaries: res.data.todayCount || 0,
//           totalReceptionists: 5, // mock until API ready
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchStats();
//   }, []);

//   const cards = [
//     {
//       title: "Total Beneficiaries",
//       value: stats.totalBeneficiaries,
//       icon: <FaUsers className="text-blue-600 text-4xl" />,
//       color: "bg-blue-100",
//     },
//     {
//       title: "Today’s Registered",
//       value: stats.todayBeneficiaries,
//       icon: <FaClipboardList className="text-green-600 text-4xl" />,
//       color: "bg-green-100",
//     },
//     {
//       title: "Total Receptionists",
//       value: stats.totalReceptionists,
//       icon: <FaUserTie className="text-purple-600 text-4xl" />,
//       color: "bg-purple-100",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cards.map((card, index) => (
//           <motion.div
//             key={index}
//             className={`p-6 rounded-xl shadow-lg flex items-center justify-between ${card.color}`}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.2 }}
//           >
//             <div>
//               <h2 className="text-lg font-semibold">{card.title}</h2>
//               <p className="text-2xl font-bold mt-2">{card.value}</p>
//             </div>
//             {card.icon}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// logout
import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [isAuth, setIsAuth] = useState(null); // null = checking
  const [stats, setStats] = useState({
    totalBeneficiaries: 0,
    todayBeneficiaries: 0,
    totalReceptionists: 0,
  });
  const [blogs, setBlogs] = useState([]);

  // ✅ Check Auth on Mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuth(false);
      window.location.href = "/admin/login";
    } else {
      setIsAuth(true);
    }
  }, []);

  // ✅ Fetch Stats
  useEffect(() => {
    if (!isAuth) return;
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/receptionist/stats/today");
        setStats({
          totalBeneficiaries: 120,
          todayBeneficiaries: res.data.todayCount || 0,
          totalReceptionists: 5,
        });
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) handleLogout();
      }
    };
    fetchStats();
  }, [isAuth]);

  // ✅ Fetch Blogs
  useEffect(() => {
    if (!isAuth) return;
    axios
      .get("http://localhost:4001/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, [isAuth]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/admin/login";
  };

  if (isAuth === null) {
    return <div className="text-center p-10">Checking authentication...</div>;
  }

  const cards = [
    {
      title: "Total Beneficiaries",
      value: stats.totalBeneficiaries,
      icon: <FaUsers className="text-blue-600 text-4xl" />,
      color: "bg-blue-100",
    },
    {
      title: "Today’s Registered",
      value: stats.todayBeneficiaries,
      icon: <FaClipboardList className="text-green-600 text-4xl" />,
      color: "bg-green-100",
    },
    {
      title: "Total Receptionists",
      value: stats.totalReceptionists,
      icon: <FaUserTie className="text-purple-600 text-4xl" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="bg-primary text-black shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Saylani Beneficiary</Link>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/admin/register" className="hover:underline">Admin Register</Link>
            <Link to="/admin/login" className="hover:underline">Admin Login</Link>
            <Link to="/admin/dashboard" className="hover:underline">Admin Dashboard</Link>
            <Link to="/admin/post" className="hover:underline">Post</Link>
            <Link to="/student/register" className="hover:underline">Student Register</Link>
            <Link to="/benefiary/register" className="hover:underline">Benefiary Register</Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-lg flex items-center justify-between ${card.color}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div>
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
              </div>
              {card.icon}
            </motion.div>
          ))}
        </div>

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
      </div>
    </>
  );
};

export default AdminDashboard;
