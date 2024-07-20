import express from "express";
import { upload } from "../lib/multer";
import { uploadLimiter } from "../lib/expressRateLimit";
import {
  deleteFile,
  getFiles,
  uploadFile,
} from "../controller/filesController";
import uploadMiddleware from "../middleware/upload";

const router = express.Router();

router.get("/", getFiles);
router.post("/", uploadLimiter, uploadMiddleware, uploadFile);
router.delete("/:filename", deleteFile);

export default router;
