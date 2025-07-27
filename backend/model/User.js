import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "receptionist", "department_staff", "beneficiary"],
      default: "beneficiary",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent overwrite error in dev with hot-reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
