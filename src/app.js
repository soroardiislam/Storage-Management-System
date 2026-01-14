
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import "./config/db.config.js";
dotenv.config();

const app = express();
app.use(express.json());
routes(app);

export default app;
