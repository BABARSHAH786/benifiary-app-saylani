// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// export default function RegisterBeneficiary() {
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
//         "http://localhost:4001/beneficiary/register",
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

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
//           Register Beneficiary
//         </h2>

//         {["cnic", "name", "phone", "address", "purpose", "department"].map((field) => (
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
    } finally {
      setLoading(false);
    }
  };

  const departments = ["Medical", "Food", "Education", "Shelter", "Other"];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Register Beneficiary
        </h2>

        {["cnic", "name", "phone", "address", "purpose"].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block mb-1 capitalize text-gray-700">
              {field}
            </label>
            <input
              id={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

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
