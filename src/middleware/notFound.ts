import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({ error: "Not found!" });
};

export default notFound;
