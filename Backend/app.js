import express from "express";
import dotenv from "dotenv";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js ";

dotenv.config({ path: "./.env" });

const app = express();

// server checking
app.get("/", (req, res) => {
  res.status(200).json("🚀 Todo API is running...");
});

// undefined routes error
app.use((req, res, next) => {
  next(new HttpError("Requested routes not found", 404));
});

// Global error handler
app.use((error, req, res, next) => {
  if (req.headerSent) {
    return next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Internal server error" });
});

async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`server listing on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
