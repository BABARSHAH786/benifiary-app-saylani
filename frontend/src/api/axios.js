// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001", // or your Render URL later
  withCredentials: true, // if using cookies for auth (optional)
});

export default api;
