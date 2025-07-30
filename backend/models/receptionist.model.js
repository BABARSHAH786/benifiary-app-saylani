// // model/receptionist.model.js
// import mongoose from "mongoose";

// const receptionistSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const Receptionist = mongoose.model("Receptionist", receptionistSchema);
// export default Receptionist;

import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema(
  {
    cnic: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String },
    gender: { type: String },
    address: { type: String },
    familyMembers: { type: Number },
    department: { type: String },
    tokenNumber: { type: Number },
    visitDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// ✅ This prevents OverwriteModelError when using ES Modules and Nodemon
const Beneficiary = mongoose.models.Beneficiary || mongoose.model("Beneficiary", beneficiarySchema);

export default Beneficiary;
