import express from "express";
import dotenv from "dotenv";
import loggingMiddleware from "./middleware/logging.js";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";
import { MESSAGES, HTTP_STATUS } from "./config/constants.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    message: MESSAGES.WELCOME,
  });
});

app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  console.error(err.stack);

  res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: err.message || "Internal Server Error",
  });
});

// local only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;