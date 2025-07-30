
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



// working code before abdul han admin logic
// index.js
// index.js
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// // Route Imports
// import todoRoute from "./route/todo.route.js";
// import userRoute from "./route/user.route.js";
// import beneficiaryRoute from "./route/beneficiary.route.js";
// import receptionistRoute from "./route/receptionistRoute.js";
// import adminRoute from "./route/adminRoute.js";
// import adminUserRoutes from "./route/Adminuserroute.js"; // ✅ MATCHES FILE CASE
// // import student from "./route/beneficiary.route.js"; // ✅ MATCHES FILE CASE
// // admin
// import bcrypt from "bcrypt"
// import studentRoute from "./route/studentRoute.js"; // ✅ MATCHES FILE CASE

// import router from "./route/index.js"





// // const createAdmin  = async ( ) => {
// //   const User = require('./model/');
// //   // const bcrypt = require("bcrypt");
// //   // const checkUser = await User.findOne({ email: "admin@example.com" });
// //   try{
// //     const checkUser = await User.findOne( {role: "admin"} )
// //     const hashPassword = await bcrypt.hash(process.env.ADMIN_ACCESS, 10);
    
// //     if(!checkUser) {
// //       const user = new User({
// //         name: "Admin",
// //         email: "admin@admin.com",
// //         password: hashPassword,
// //         role: "admin"
// //       });

// //       await user.save();
// //       console.log("admin created succesfully ", user.name, user.email)

// //     }else{
// //       console.log("admin already exists", checkUser);
// //     }
// //   }catch(err) {
// //     console.log("error", err);
// //   }
// // }




//   // getting the app run 



// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4001;
// const DB_URI = process.env.MONGODB_URI;

// // Middlewares


// // MongoDB Connection
// mongoose
//   .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Routes
// app.use("/todo", todoRoute);
// app.use("/user", userRoute);
// app.use("/beneficiary", beneficiaryRoute);
// app.use("/receptionist", receptionistRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/adminuser", adminUserRoutes);
// app.use("/student", studentRoute);


// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );



// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });









// new work

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
import receptionistRoute from "./route/receptionistRoute.js";
// import adminRoute from "./route/adminRoute.js";
// import adminUserRoutes from "./route/Adminuserroute.js"; // ✅ MATCHES FILE CASE
// import student from "./route/beneficiary.route.js"; // ✅ MATCHES FILE CASE
// admin
import bcrypt from "bcrypt"
import studentRoute from "./route/studentRoute.js"; // ✅ MATCHES FILE CASE
import adminRouteAb from "./route/adminRouteAb.js"; // 

import router from "./route/index.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const DB_URI = process.env.MONGODB_URI;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
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
app.use("/student", studentRoute);
app.use("/api/receptionist", receptionistRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/adminuser", adminUserRoutes);
app.use("/student", studentRoute);
app.use("/admin", adminRouteAb);



// Home route
app.get("/", (req, res) => {
  res.json({ message: "✅ Welcome to the Babar Backend API" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});