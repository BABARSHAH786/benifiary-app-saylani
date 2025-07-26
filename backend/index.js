
// // new
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import todoRoute from "./route/todo.route.js";
// import userRoute from "./route/user.route.js";
// import cookieParser from "cookie-parser";
// const app = express();
// dotenv.config();

// const PORT = process.env.PORT || 4002;
// const DB_URI = process.env.MONGODB_URI;

// // middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: ["Content-Type", "Authorization"], // Add other headers you want to allow here.
//   })
// );

// // Database connection code
// try {
//   await mongoose.connect(DB_URI);
//   console.log("Connected to MongoDB");
// } catch (error) {
//   console.log(error);
// }

// // routes
// app.use("/todo", todoRoute);
// app.use("/user", userRoute);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



// new
// index.js
// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route Imports
import todoRoute from "./route/todo.route.js";
import userRoute from "./route/user.route.js";
import beneficiaryRoute from "./route/beneficiary.route.js";
import receptionistRoute from "./route/receptionistRoute.js"; // ✅ All receptionist routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const DB_URI = process.env.MONGODB_URI;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // fallback if .env missing
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB Connection
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);
app.use("/beneficiary", beneficiaryRoute);
app.use("/api/receptionist", receptionistRoute); // ✅ All receptionist routes under this

// Home route
app.get("/", (req, res) => {
  res.json({ message: "✅ Welcome to the Babar Backend API" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
