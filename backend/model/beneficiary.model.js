import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema(
  {
    cnic: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: String,
    address: String,
    purpose: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Receptionist who registered
    },
  },
  { timestamps: true }
);

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);
export default Beneficiary;
