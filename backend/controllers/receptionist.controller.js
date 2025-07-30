// controller/receptionist.controller.js
import Receptionist from "../model/receptionist.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register Receptionist
export const registerReceptionist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await Receptionist.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Receptionist already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newReceptionist = new Receptionist({
      name,
      email,
      password: hashedPassword,
    });

    await newReceptionist.save();

    res.status(201).json({ message: "Receptionist registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login Receptionist (optional)
export const loginReceptionist = async (req, res) => {
  try {
    const { email, password } = req.body;

    const receptionist = await Receptionist.findOne({ email });
    if (!receptionist) {
      return res.status(404).json({ error: "Receptionist not found" });
    }

    const isMatch = await bcrypt.compare(password, receptionist.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: receptionist._id, role: "receptionist" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // change to true in production (HTTPS)
      })
      .status(200)
      .json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get today's stats
export const getTodayStats = async (req, res) => {
  try {
    // Replace with real logic (e.g., counting today's beneficiaries)
    const todayCount = 5; // Dummy value for now

    res.json({
      date: new Date().toISOString().split("T")[0],
      beneficiariesToday: todayCount,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to get stats" });
  }
};
