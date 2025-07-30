// backend/model/Token.js
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    beneficiaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming Receptionist or Admin is a user
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);
export default Token;
