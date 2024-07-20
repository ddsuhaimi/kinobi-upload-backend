import { RequestHandler } from "express-serve-static-core";
import ApiError from "../helpers/ApiError";
import { upload } from "../lib/multer";
import multer from "multer";
const uploadMiddleware: RequestHandler = (req, res, next) => {
  const uploadMulter = upload.single("file");

  // Here call the upload middleware of multer
  uploadMulter(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      next(new ApiError(err.message, 500));
    } else if (err) {
      console.log("eer", "sss");
      // An unknown error occurred when uploading.
      next(new ApiError(err.message, 500));
    }

    // Everything went fine.
    next();
  });
};

export default uploadMiddleware;
