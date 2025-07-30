// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// export default function AdminRegister() {
//   const [formData, setFormData] = useState({
//     cnic: "",
//     name: "",
//     phone: "",
//     address: "",
//     purpose: "",
//     department: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4001/admin/register",
//         formData,
//         { withCredentials: true }
//       );

//       toast.success(`✅ ${data.message} — Token: ${data.token}`);

//       setFormData({
//         cnic: "",
//         name: "",
//         phone: "",
//         address: "",
//         purpose: "",
//         department: "",
//       });
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "❌ Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const departments = ["Medical", "Food", "Education", "Shelter", "Other"];

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
//           Register Admin
//         </h2>

//         {["cnic", "name", "phone", "address", "purpose"].map((field) => (
//           <div key={field} className="mb-4">
//             <label htmlFor={field} className="block mb-1 capitalize text-gray-700">
//               {field}
//             </label>
//             <input
//               id={field}
//               type="text"
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//         ))}

//         {/* Department select field */}
//         <div className="mb-6">
//           <label htmlFor="department" className="block mb-1 text-gray-700">
//             Department
//           </label>
//           <select
//             id="department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="" disabled>Select Department</option>
//             {departments.map((dept) => (
//               <option key={dept} value={dept}>
//                 {dept}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
//             loading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }



// required filled is missing
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Assuming react-hot-toast is installed for notifications

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    email: "", // Added email field
    password: "", // Added password field
    confirmPassword: "", // Added confirmPassword for client-side validation
    phone: "",
    address: "",
    purpose: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Destructure formData to only send necessary fields to the backend
      const { cnic, name, email, password, phone, address, purpose, department } = formData;

      const { data } = await axios.post(
        "http://localhost:4001/admin/register", // Ensure this URL matches your backend API endpoint
        { cnic, name, email, password, phone, address, purpose, department }, // Send only the fields the backend expects
        { withCredentials: true }
      );

      toast.success(`✅ ${data.message} — Token: ${data.token}`);

      // Clear the form after successful registration
      setFormData({
        cnic: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        purpose: "",
        department: "",
      });
    } catch (err) {
      console.error("Registration error:", err); // Log the full error for debugging
      toast.error(err?.response?.data?.message || "❌ Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const departments = ["Medical", "Food", "Education", "Admin", "Other"];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Register Admin
        </h2>

        {/* Dynamic fields for CNIC, Name, Phone, Address, Purpose */}
        {["cnic", "name", "phone", "address", "purpose"].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block mb-1 capitalize text-gray-700">
              {field}
            </label>
            <input
              id={field}
              type="text" // Use 'text' for CNIC, 'tel' for phone if desired
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 capitalize text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email" // Use type="email" for email input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 capitalize text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password" // Use type="password" for password input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Confirm Password field */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 capitalize text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password" // Use type="password" for password input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>


        {/* Department select field */}
        <div className="mb-6">
          <label htmlFor="department" className="block mb-1 text-gray-700">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
