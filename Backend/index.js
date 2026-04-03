import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoutes from "./Routes/course.route.js";  
import userRoutes from "./Routes/user.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
const app = express();
dotenv.config();

// middleware
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);


const port = process.env.PORT || 3000;
// console.log("PORT from env =", process.env.PORT);
const DB_URI = process.env.MONGO_URI;

try {
 await  mongoose.connect(DB_URI)
  console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}

app.get("/", (req, res) => {
  res.send("Server working perfectly Mehraj...");
});

// define routes
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/user", userRoutes);

// cluodinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});