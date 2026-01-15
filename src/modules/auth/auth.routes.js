import express from "express";
import * as authController from "./auth.controller.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyOTP", authController.verifyOTP);
router.patch("/resetPassword", authController.resetPassword); 

router.get("/logout", authController.logout);

export default router;
