import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

const allowedOrigin = [
  "http://localhost:5173",
  "https://mern-auth-client-50tv.onrender.com",
];
//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));

//API Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server running on the port:${port}`));
