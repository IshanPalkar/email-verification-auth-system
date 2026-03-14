import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import { apiLogger } from "./middlewares/logger.middleware";
import { apiRateLimiter } from "./middlewares/rateLimiter";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { setupBullBoard } from "./queues/queueDashboard";
import { swaggerUi, swaggerSpec } from "./config/swagger";


dotenv.config();

const app = express();

// Apply rate limiting to all requests
app.use(apiRateLimiter);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use(express.json());

app.use(apiLogger); // Log all API requests

app.use("/auth", authRoutes);

const bullBoardAdapter = setupBullBoard();

app.use("/queues", bullBoardAdapter.getRouter());

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Global error handling
app.use(globalErrorHandler);

export default app;