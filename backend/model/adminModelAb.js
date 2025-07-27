import mongoose from "mongoose"
const UserSchema = mongoose.Schema({
    name: String, 
    email: String, 
    password: { type: String, unique: true },
    role: { type: String, enum: ["admin", "receptionist", "staff"], required: true },
})
const user = mongoose.model("beneficiary_users", UserSchema)

export default user;