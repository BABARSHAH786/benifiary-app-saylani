// model/receptionist.model.js
import mongoose from "mongoose";

const receptionistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Receptionist = mongoose.model("Receptionist", receptionistSchema);
export default Receptionist;
