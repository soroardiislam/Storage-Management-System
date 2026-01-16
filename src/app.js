import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import globalErrorHandler from "./middlewares/error.js";
import AppError from "./utils/AppError.js";

import authRouter from "./modules/auth/auth.routes.js";
import storageRouter from "./modules/storage/storage.routes.js";
import userRouter from "./modules/user/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/storage", storageRouter);
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
