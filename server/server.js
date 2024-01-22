import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import dataRoute from "./routes/dataRoute.js"; 
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", userRoute);
app.use("/", dataRoute); 

const PORT = process.env.PORT || 8080;

// Run Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
