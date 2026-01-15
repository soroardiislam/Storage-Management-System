import express from "express";
import * as userController from "./controller.js";
const router = express.Router();
router.post("/", userController.createUser);
export default router;
