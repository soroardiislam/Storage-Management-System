import express from "express";
import dotenv from "dotenv";
import "./config/db.config.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
export default app;
