import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { uploadDirectory } from "../lib/multer";
import ApiError from "../helpers/ApiError";

export async function getFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = fs.readdirSync(uploadDirectory);
    const fileList = files
      .map((file) => {
        const filePath = path.join(uploadDirectory, file.toString());
        const stats = fs.statSync(filePath);
        return {
          name: file,
          createdAt: stats.birthtime,
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.status(200).json({ files: fileList });
  } catch (error) {
    next(error);
  }
}

export async function deleteFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filepath = path.join(uploadDirectory, req.params.filename);
    fs.unlinkSync(filepath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function uploadFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) {
      throw new ApiError("No file uploaded", 400);
    }

    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  } catch (err) {
    next(err);
  }
}
