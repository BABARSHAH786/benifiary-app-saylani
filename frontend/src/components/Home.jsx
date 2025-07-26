import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        // https://backend-only-6264.onrender.com
        // const response = await axios.get("http://localhost:4001/todo/fetch", {
        const response = await axios.get("https://backend-only-6264.onrender.com/todo/fetch", {

          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "https://backend-only-6264.onrender.com/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `https://backend-only-6264.onrender.com/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to find todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`https://backend-only-6264.onrender.com/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to Delete Todo");
    }
  };

  const navigateTo = useNavigate();
  const logout = async () => {
    try {
      // await axios.get("https://backend-only-6264.onrender.com/user/logout", { // roiginal
      await axios.get("http://localhost:4001/user/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className=" my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && todoCreate()}
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={todoCreate}
          className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
        >
          Add
        </button>
      </div>
      {loading ? (
        <div className="text-center justify-center">
          <span className="textgray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                  className="mr-2"
                />
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-800 font-semibold"
                      : ""
                  } `}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => todoDelete(todo._id)}
                className="text-red-500 hover:text-red-800 duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingTodos} remaining todos
      </p>
      <button
        onClick={() => logout()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;



// new benifiary app
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// // Ensure Tailwind CSS is loaded (assuming it's configured in your project)
// // You might need to add <script src="https://cdn.tailwindcss.com"></script> in your HTML if not using a build tool.

// /**
//  * Login Component
//  * A simple login form for demonstration purposes.
//  * In a real app, this would handle authentication with your backend.
//  */
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Base URL for your backend API.
//   const API_BASE_URL = "https://backend-only-6264.onrender.com";

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // This is a placeholder for your actual login API call.
//       // You would typically send email/password and receive a JWT token.
//       const response = await axios.post(`${API_BASE_URL}/user/login`, {
//         email,
//         password,
//       }, {
//         withCredentials: true, // Important for sending cookies/JWT
//         headers: {
//             "Content-Type": "application/json",
//         },
//       });

//       // Assuming successful login, navigate to home
//       if (response.data.success) {
//         toast.success("Logged in successfully!");
//         // Store JWT if your backend sends it in local storage (though HTTP-only cookies are preferred)
//         // localStorage.setItem("jwt", response.data.token);
//         navigate("/home"); // Navigate to the home page after successful login
//       } else {
//         toast.error(response.data.message || "Login failed.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error(error.response?.data?.message || "Error logging in. Please check credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 w-full"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </div>
//         </form>
//         <p className="mt-6 text-center text-gray-600 text-sm">
//           Don't have an account?{" "}
//           <button
//             onClick={() => toast.info("Navigate to Register page")}
//             className="text-blue-600 hover:text-blue-800 font-semibold"
//           >
//             Register here
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }








// // new 
// /**
//  * Home Component for the Beneficiary Management App.
//  * Displays content based on the logged-in user's role (Admin, Receptionist, Department Staff).
//  * Fetches user profile to determine the role and provides role-specific navigation options.
//  */
// function Home() {
//   const [user, setUser] = useState(null); // Stores logged-in user data, including role
//   const [loading, setLoading] = useState(true); // Loading state for fetching user data
//   const [error, setError] = useState(null); // Error state for API calls
//   const navigate = useNavigate(); // Hook for programmatic navigation

//   // Base URL for your backend API. Make sure this is correct for your Render deployment.
//   // Replace with your actual Render backend URL or localhost during development.
//   const API_BASE_URL = "https://backend-only-6264.onrender.com"; // Your Render backend URL

//   useEffect(() => {
//     /**
//      * Fetches the logged-in user's profile to determine their role.
//      * This is crucial for rendering role-specific content on the home page.
//      */
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
//         // Make a GET request to your backend to fetch user profile
//         const response = await axios.get(`${API_BASE_URL}/user/profile`, {
//           withCredentials: true, // Important for sending cookies/JWT
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         setUser(response.data.user); // Assuming your backend returns user data under 'user' key
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch user profile:", err);
//         setError("Failed to load user data. Please log in again.");
//         toast.error("Session expired or invalid. Please log in.");
//         navigate("/login"); // Redirect to login if profile fetch fails (e.g., not authenticated)
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]); // Dependency array includes navigate to avoid lint warnings

//   /**
//    * Handles user logout.
//    * Clears session/local storage and redirects to the login page.
//    */
//   const handleLogout = async () => {
//     try {
//       await axios.get(`${API_BASE_URL}/user/logout`, {
//         withCredentials: true,
//       });
//       toast.success("User logged out successfully!");
//       localStorage.removeItem("jwt"); // Clear any stored JWT (if you're using local storage for it)
//       setUser(null); // Clear user state
//       navigate("/login"); // Redirect to login page
//     } catch (err) {
//       console.error("Error logging out:", err);
//       toast.error("Failed to log out. Please try again.");
//     }
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-xl text-gray-700">Loading user data...</div>
//       </div>
//     );
//   }

//   // Render error state or if user data is not available (should redirect to login in useEffect)
//   if (error || !user) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//         <div className="text-xl text-red-600 font-semibold mb-4">{error || "Not logged in."}</div>
//         <button
//           onClick={() => navigate("/login")}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
//       <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-4xl text-center">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
//           Welcome, {user.name || "User"}!
//         </h1>
//         <p className="text-lg text-gray-600 mb-8">
//           You are logged in as an <span className="font-semibold text-blue-700 capitalize">{user.role}</span>.
//         </p>

//         {/* Admin Dashboard Section */}
//         {user.role === "admin" && (
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4">Admin Dashboard</h2>
//             <p className="text-blue-700 mb-6">
//               As an Admin, you have full access to manage users, departments, and view comprehensive reports.
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <button
//                 onClick={() => toast.info("Navigate to User Management")}
//                 className="bg-blue-600 text-white py-3 px-5 rounded-md shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
//               >
//                 Manage Users
//               </button>
//               <button
//                 onClick={() => toast.info("Navigate to Dashboard Metrics")}
//                 className="bg-green-600 text-white py-3 px-5 rounded-md shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
//               >
//                 View Dashboard
//               </button>
//               <button
//                 onClick={() => toast.info("Navigate to Reports & Logs")}
//                 className="bg-purple-600 text-white py-3 px-5 rounded-md shadow-md hover:bg-purple-700 transition duration-300 transform hover:scale-105"
//               >
//                 Generate Reports
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Receptionist Section */}
//         {user.role === "receptionist" && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-green-800 mb-4">Receptionist Portal</h2>
//             <p className="text-green-700 mb-6">
//               Register new beneficiaries and assign tokens for their visits.
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <button
//                 onClick={() => toast.info("Navigate to Beneficiary Registration")}
//                 className="bg-green-600 text-white py-3 px-5 rounded-md shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
//               >
//                 Register Beneficiary
//               </button>
//               <button
//                 onClick={() => toast.info("Navigate to Token Assignment")}
//                 className="bg-teal-600 text-white py-3 px-5 rounded-md shadow-md hover:bg-teal-700 transition duration-300 transform hover:scale-105"
//               >
//                 Assign Token
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Department Staff Section */}
//         {user.role === "department_staff" && (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-yellow-800 mb-4">Department Operations</h2>
//             <p className="text-yellow-700 mb-6">
//               Scan tokens, retrieve beneficiary details, and update assistance status.
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <button
//                 onClick={() => toast.info("Navigate to Scan Token")}
//                 className="bg-yellow-600 text-white py-3 px-5 rounded-md shadow-md hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
//               >
//                 Scan Token
//               </button>
//               <button
//                 onClick={() => toast.info("Navigate to Update Status")}
//                 className="bg-orange-600 text-white py-3 px-5 rounded-md shadow-md hover:bg-orange-700 transition duration-300 transform hover:scale-105"
//               >
//                 Update Assistance Status
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="mt-8 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// /**
//  * Main App Component
//  * Sets up the React Router for navigation.
//  */
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} /> {/* Default route to Login */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         {/* Add more routes here as you build out your application */}
//         {/* Example: <Route path="/admin/users" element={<UserManagement />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// function Home() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("jwt");
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-md w-full">
//         <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to the Home Page</h1>
//         <p className="text-gray-700 mb-6">You are successfully logged in 🎉</p>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Home;
