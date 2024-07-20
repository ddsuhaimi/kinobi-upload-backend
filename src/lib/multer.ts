import multer from "multer";
import fs from "fs";
import sanitize from "sanitize-filename";

export const uploadDirectory = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = sanitize(file.originalname);
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

export const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});
