// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const BeneficiaryRegister = () => {
//   const [formData, setFormData] = useState({
//     cnic: "",
//     name: "",
//     phone: "",
//     address: "",
//     purpose: "",
//     department: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("jwt");
//     const role = localStorage.getItem("userRole");

//     if (role !== "Receptionist") {
//       toast.error("Access Denied: Only Receptionists can register beneficiaries.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:4001/beneficiary/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       toast.success(res.data.message);
//       console.log("Beneficiary Registered:", res.data);

//       // Clear form
//       setFormData({
//         cnic: "",
//         name: "",
//         phone: "",
//         address: "",
//         purpose: "",
//         department: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Register New Beneficiary
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="cnic"
//           placeholder="CNIC (xxxxx-xxxxxxx-x)"
//           value={formData.cnic}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="text"
//           name="purpose"
//           placeholder="Purpose of Visit (e.g., Medical Assistance)"
//           value={formData.purpose}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />

//         <select
//           name="department"
//           value={formData.department}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Department</option>
//           <option value="Medical">Medical</option>
//           <option value="Food">Food</option>
//           <option value="Education">Education</option>
//           <option value="Financial">Financial</option>
//           <option value="Other">Other</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Register Beneficiary
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BeneficiaryRegister;
