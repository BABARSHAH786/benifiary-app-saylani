// controller/adminAb.js
import User from "../model/adminModelAb.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "Please enter complete credentials" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found with that info" });
    }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(404).json({ message: "Invalid Email Or Password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    res.status(200).json({
      message: "User successfully logged in",
      data: { token, admin: user },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
