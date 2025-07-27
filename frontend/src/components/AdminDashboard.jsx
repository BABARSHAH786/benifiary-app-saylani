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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome Admin! 🎉</p>
    </div>
  );
};

export default AdminDashboard;
