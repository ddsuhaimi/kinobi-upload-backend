import { ErrorRequestHandler } from "express";
import ApiError from "../helpers/ApiError";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export default errorHandler;
