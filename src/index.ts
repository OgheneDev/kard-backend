import express from "express";
import cors from "cors";
import ogRouter from "./routes/og.routes";
import { closeBrowser } from "./lib/browser";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Allow specific origin or all
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/og", ogRouter);

const server = app.listen(PORT, () => {
  console.log(`kard-api running on port ${PORT}`);
});

process.on("SIGTERM", async () => {
  await closeBrowser();
  server.close();
});
