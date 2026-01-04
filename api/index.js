import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

// --- Database Connection ---
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// --- Middleware ---

app.use(express.json());
app.use(cors());

app.use(cookieParser());



// --- Routes ---

// Add the Auth Route here <--- ADD THIS
app.use("/api/auth", authRoute); 
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.get("/", (req, res) => {
  res.send("Hello from Booking API!");
});

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// --- Start Server ---
app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("Connected to backend on port 8800.");
});