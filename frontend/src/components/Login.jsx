import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Assuming you have react-hot-toast installed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Custom CSS for animations. Tailwind CSS handles most styling,
  // but keyframe animations like these are often defined with raw CSS.
  const styles = `
    /* Background animation */
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

    /* Card entry animation */
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    .card-enter-animation {
        animation: fadeInScale 0.7s ease-out forwards;
    }

    /* Input focus animation */
    .input-focus-animation:focus {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Tailwind's blue-500 with opacity */
        border-color: #3b82f6; /* Tailwind's blue-500 */
    }

    /* Button hover animation */
    .button-hover-animation {
        transition: background-color 0.3s ease, transform 0.2s ease;
    }
    .button-hover-animation:hover {
        transform: translateY(-2px);
    }
    .button-hover-animation:active {
        transform: translateY(0);
    }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted

    try {
      const { data } = await axios.post(
        'http://localhost:4001/admin/login', // Your backend login API endpoint
        { email, password },
        { withCredentials: true } // Important if your backend uses cookies/sessions
      );

      // On successful login
      toast.success(`✅ ${data.message}`);
      console.log('Login successful:', data);
      // You can now store the token (e.g., in localStorage or a state management solution)
      // localStorage.setItem('adminToken', data.token);
      // localStorage.setItem('adminInfo', JSON.stringify(data.admin));

      // Redirect to the Admin Dashboard
      navigate('/admin/dashboard'); // Navigate to your AdminDashboard route

      // Clear form fields
      setEmail('');
      setPassword('');

    } catch (err) {
      // On login failure
      console.error('Login error:', err);
      toast.error(err?.response?.data?.message || '❌ Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Inject styles into the head of the document */}
      <style>{styles}</style>

      <div className="flex items-center justify-center min-h-screen animated-background">
        <div className="card-enter-animation bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-500 ease-in-out">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-focus-animation transition-all duration-200"
                required
              />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-focus-animation transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 button-hover-animation shadow-lg ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-800'
              }`}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Don't have an account?
              {/* You might want to link this to your AdminRegister component or route */}
              <a href="/admin/register" className="text-blue-600 hover:underline font-semibold">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
