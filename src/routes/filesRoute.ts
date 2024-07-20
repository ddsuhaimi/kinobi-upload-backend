import express from "express";
import { upload } from "../lib/multer";
import { uploadLimiter } from "../lib/expressRateLimit";
import {
  deleteFile,
  getFiles,
  uploadFile,
} from "../controller/filesController";

const router = express.Router();

router.get("/", getFiles);
router.post("/", uploadLimiter, upload.single("file"), uploadFile);
router.delete("/:filename", deleteFile);

export default router;
