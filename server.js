import app from "./app.js";
import dotenv from "dotenv";
import { connectdb } from "./config/database.js";
import cloudinary from "cloudinary";
dotenv.config({
  path: "./config/config.env",
});
connectdb();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
