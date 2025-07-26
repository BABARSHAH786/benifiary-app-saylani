const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      "http://localhost:4001/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true, // ⬅️ important for cookie-based auth
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success(data.message || "Login successful");

    localStorage.setItem("jwt", data.token); // optional if cookie is used
    localStorage.setItem("userRole", data.user?.role || "");

    navigateTo("/"); // Go to dashboard or homepage
    setEmail("");
    setPassword("");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
  }
};





import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        // https://backend-only-6264.onrender.com
        // "https://backend-only-6264.onrender.com/user/login", //original
        "http://localhost:4001/user/login",

        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "User loggedin successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User registration failed");
    }
  };

  return (
    <div>
      <div>
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>
            <form onSubmit={handleRegister}>
              {/* email */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type Email"
                />
              </div>
              {/* password */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type Username"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
              >
                Login
              </button>
              <p className="mt-4 text-center text-gray-600">
                New user?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Signup
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



// login role
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/user/login", {
//         email: "admin@example.com",
//         password: "123456"
//       });

//       const { token, role } = res.data;

//       // Save token and role in localStorage (or context)
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       // ✅ Redirect based on role
//       switch (role) {
//         case "Admin":
//           navigate("/admin/dashboard");
//           break;
//         case "Receptionist":
//           navigate("/receptionist/dashboard");
//           break;
//         case "Staff":
//           navigate("/staff/dashboard");
//           break;
//         case "Beneficiary":
//           navigate("/beneficiary/dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       {/* Login Form Inputs */}
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
