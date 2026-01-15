import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import "./config/db.config.js";
const app = express();
dotenv.config();
app.use(cookieParser());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
routes(app);
app.use(errorHandler);
export default app;
