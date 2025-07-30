// import mongoose from "mongoose";

// const beneficiarySchema = new mongoose.Schema(
//   {
//     cnic: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     phone: String,
//     address: String,
//     purpose: {
//       type: String,
//       required: true,
//     },
//     department: {
//       type: String,
//       required: true,
//     },
//     token: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "In Progress", "Completed"],
//       default: "Pending",
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Receptionist who registered
//     },
//   },
//   { timestamps: true }
// );

// const Admin = mongoose.model("Admin", beneficiarySchema);
// export default Admin;




// NEW
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    cnic: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true },  // for login
    password: { type: String },             // for login
    phone: { type: String },
    address: { type: String },
    purpose: { type: String },
    department: { type: String },
    token: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
