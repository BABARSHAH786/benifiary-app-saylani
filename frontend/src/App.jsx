import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import BeneficiaryRegister from "./components/beneficiary-register";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";
import RegisterBeneficiary from "./components/RegisterBeneficiary";

function App() {
  const token = localStorage.getItem("jwt");
  return (
    <div className="bg-red-100">
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/beneficiary-register" element={<BeneficiaryRegister />} /> */}
        <Route path="/beneficiary/register" element={<RegisterBeneficiary />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
  <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
  <Route path="/staff/dashboard" element={<StaffDashboard />} />
  <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />*/}


        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
