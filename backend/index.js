
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

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import todoRoute from "./route/todo.route.js";
import userRoute from "./route/user.route.js";
import beneficiaryRoute from "./route/beneficiary.route.js";

dotenv.config();

const app = express(); // <--- MUST come before using 'app'

const PORT = process.env.PORT || 4001;
const DB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// DB Connection
try {
  await mongoose.connect(DB_URI);
  console.log("✅ Connected to MongoDB");
} catch (error) {
  console.error("❌ MongoDB connection error:", error);
}

// Routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);
app.use("/beneficiary", beneficiaryRoute); // ✅ Now it's in the correct place

// Default route
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "✅ Todo backend is running! Welcome to babar backend",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
