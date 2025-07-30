// import React from "react";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// // import BeneficiaryRegister from "./components/beneficiary-register";
// import { Navigate, Route, Routes } from "react-router-dom";
// import PageNotFound from "./components/PageNotFound";
// import { Toaster } from "react-hot-toast";
// import RegisterBeneficiary from "./components/RegisterBeneficiary";
// import AdminDashboard from "./components/AdminDashboard";
// import ReceptionistDashboard from "./components/ReceptionistDashboard";
// import ReceptionLogin from "./components/ReceptionLogin";
// import ReceptionRegister from "./components/ReceptionRegister";
// import AdminRegister from "./components/AdminRegister";
// import AdminLogin from "./components/AdminLogin";
// import Student from "./components/student";
// import AdminPost from "./components/AdminPost";
// import BlogList from "./components/BlogList";
// import AdminDashboardblog from "./components/AdminDashboardblog";

// function App() {
//   const token = localStorage.getItem("jwt");
//   return (
//     <div className="bg-red-100">
//       <Routes>
//         <Route
//           path="/"
//           element={token ? <Home /> : <Navigate to={"/login"} />}
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/beneficiary/register" element={<RegisterBeneficiary />} />
//         <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
//         <Route path="/reception/login" element={<ReceptionLogin />} />
//         <Route path="/reception/register" element={<ReceptionRegister />} />
//         {/* admin */}
//         <Route path="/admin/register" element={<AdminRegister />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/student/register" element={<Student />} />
//         <Route path="/admin/post" element={<AdminPost />} />
//         <Route path="/admin/blog" element={<BlogList />} />
//         <Route path="/admin/dashbordblog" element={<AdminDashboardblog />} />




//        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}





//         {/* <Route path="/beneficiary-register" element={<BeneficiaryRegister />} /> */}
//         {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
//        <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
//        <Route path="/staff/dashboard" element={<StaffDashboard />} />
//        <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />*/}


//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// }

// export default App;






// new bc protected route add
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import BeneficiaryRegister from "./components/beneficiary-register";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";
import RegisterBeneficiary from "./components/RegisterBeneficiary";
import AdminDashboard from "./components/AdminDashboard";
import ReceptionistDashboard from "./components/ReceptionistDashboard";
import ReceptionLogin from "./components/ReceptionLogin";
import ReceptionRegister from "./components/ReceptionRegister";
import AdminRegister from "./components/AdminRegister";
import AdminLogin from "./components/AdminLogin";
import Student from "./components/student";
import AdminPost from "./components/AdminPost";
import BlogList from "./components/BlogList";
import AdminDashboardblog from "./components/AdminDashboardblog";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- added for route protection

function App() {
  const token = localStorage.getItem("jwt");

  return (
    <div className="bg-red-100">
      <Routes>
        {/* Home Page (Protected by login) */}
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashbordblog"
          element={
            <ProtectedRoute>
              <AdminDashboardblog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/post"
          element={
            <ProtectedRoute>
              <AdminPost />
            </ProtectedRoute>
          }
        />

        {/* Public Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Beneficiary & Receptionist Routes */}
        <Route path="/beneficiary/register" element={<RegisterBeneficiary />} />
        <Route
          path="/receptionist/dashboard"
          element={<ReceptionistDashboard />}
        />
        <Route path="/reception/login" element={<ReceptionLogin />} />
        <Route path="/reception/register" element={<ReceptionRegister />} />

        {/* Student Route */}
        <Route path="/student/register" element={<Student />} />

        {/* Public Blog Page */}
        <Route path="/admin/blog" element={<BlogList />} />

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
