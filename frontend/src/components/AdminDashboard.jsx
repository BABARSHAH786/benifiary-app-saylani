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
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBeneficiaries: 0,
    todayBeneficiaries: 0,
    totalReceptionists: 0,
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  // ✅ Fetch Stats from Backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/receptionist/stats/today");
        // You can create more APIs for total counts
        setStats({
          totalBeneficiaries: 120, // mock until API ready
          todayBeneficiaries: res.data.todayCount || 0,
          totalReceptionists: 5, // mock until API ready
        });
      } catch (err) {
        console.error(err);
        // Handle token expiration or unauthorized access
        if (err.response && err.response.status === 401) {
          handleLogout(); // Automatically log out if unauthorized
        }
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      // Call your backend logout endpoint (optional, but good practice)
      await axios.post("/api/admin/logout"); // Assuming this is your logout endpoint

      // Clear the JWT token from local storage
      localStorage.removeItem("adminToken"); // Or sessionStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo"); // Clear any stored admin info

      // Redirect to the login page
      navigate("/admin/login"); // Adjust this path to your admin login route
      console.log("Admin logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if backend call fails, proceed with client-side logout
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
      navigate("/admin/login");
    }
  };

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>

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
    </div>
  );
};

export default AdminDashboard;