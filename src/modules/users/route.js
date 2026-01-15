import express from "express";
import * as userController from "./controller.js";
const router = express.Router();
router.post("/", userController.createUser);
router.get("/", userController.listUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
export default router;
