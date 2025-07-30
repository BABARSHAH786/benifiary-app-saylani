import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/admin/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success(`✅ ${data.message}`);
      console.log("Login successful:", data);

      // ✅ Use a single key for JWT
      localStorage.setItem("jwt", data.token);

      // ✅ Navigate after token is set
      navigate("/admin/dashboard");

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.response?.data?.message || "❌ Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const styles = `
    @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    .animated-background {
        background: linear-gradient(270deg, #6a11cb, #2575fc);
        background-size: 400% 400%;
        animation: gradientAnimation 15s ease infinite;
    }
    @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.9) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .card-enter-animation { animation: fadeInScale 0.7s ease-out forwards; }
    .input-focus-animation:focus {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        border-color: #3b82f6;
    }
    .button-hover-animation { transition: background-color 0.3s ease, transform 0.2s ease; }
    .button-hover-animation:hover { transform: translateY(-2px); }
    .button-hover-animation:active { transform: translateY(0); }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="flex items-center justify-center min-h-screen animated-background">
        <div className="card-enter-animation bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 transition-all duration-500 ease-in-out">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-focus-animation"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-focus-animation"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 button-hover-animation shadow-lg ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-blue-700 hover:to-indigo-800"
              }`}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Don't have an account?{" "}
              <a
                href="/admin/register"
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
