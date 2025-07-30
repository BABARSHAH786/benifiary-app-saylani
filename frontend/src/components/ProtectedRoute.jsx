// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwt"); // or use context if you have
  return token ? children : <Navigate to="/admin/login" />;
}
