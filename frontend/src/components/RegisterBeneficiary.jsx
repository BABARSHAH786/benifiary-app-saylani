"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function RegisterBeneficiary() {
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4001/beneficiary/register",
        formData,
        { withCredentials: true }
      );
      toast.success(`✅ ${data.message} — Token: ${data.token}`);
      setFormData({
        cnic: "",
        name: "",
        phone: "",
        address: "",
        purpose: "",
        department: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Register Beneficiary</h2>

        {["cnic", "name", "phone", "address", "purpose", "department"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-1 capitalize text-gray-700">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
