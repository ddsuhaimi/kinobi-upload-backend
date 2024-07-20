import "dotenv/config";
import express from "express";
import filesRoute from "./routes/filesRoute";
import helmet from "./lib/helmet";
import bodyParser from "body-parser";
import limiter from "./lib/expressRateLimit";
import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";

const app = express();
const PORT = process.env.PORT;

app.use(helmet);
app.use(limiter);

// Initializing routes
const router = express.Router();
const defaultRoutes = [
  {
    path: "/files",
    route: filesRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

app.use("/api", router);

// Custom Middleware Setup
app.use(notFound);
app.use(errorHandler);

// Starting API server
app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
