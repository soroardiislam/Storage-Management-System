import express from "express";
import * as storageController from "./storage.controller.js";
import { protect } from "../../middlewares/auth.js";
import multerConfig from "../../config/multer.js";

const router = express.Router();
router.use(protect);

router.post(
  "/upload",
  multerConfig.single("file"),
  storageController.uploadFile
);
router.post("/folder", storageController.createFolder);
router.get("/", storageController.getFiles);
router.patch("/favorite/:fileId", storageController.toggleFavorite);
router.get("/details", storageController.getStorageDetails);

export default router;
