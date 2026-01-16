import express from "express";
import * as userController from "./user.controller.js";
import { protect } from "../../middlewares/auth.js";
import multerConfig from "../../config/multer.js";

const router = express.Router();

router.use(protect);

router.get("/me", userController.getMe);
router.patch(
  "/updateMe",
  multerConfig.single("avatar"),
  userController.updateMe
);
router.patch("/updateMyPassword", userController.updatePassword);

export default router;
