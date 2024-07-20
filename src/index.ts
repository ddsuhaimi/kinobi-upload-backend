import "dotenv/config";
import express from "express";
import filesRoute from "./routes/filesRoute";
import helmet from "./lib/helmet";
import limiter from "./lib/expressRateLimit";
import cors from "cors"; // Import the cors package

import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";

const app = express();
const PORT = process.env.PORT;

app.use(helmet);
app.use(limiter);

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"], // Whitelist the domains you want to allow
};
if (process.env.FRONTEND_URL) {
  corsOptions.origin.push(process.env.FRONTEND_URL);
}

app.use(cors(corsOptions));
// Initializing routes
app.use("/api/files", filesRoute);

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
