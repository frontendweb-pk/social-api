/**
 * @file index.ts
 * @description Entry point for the social-api application. Sets up the Express server, middleware, and configuration settings.
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDb } from "./utils/db";
import { errorHandler } from "./middleware/error-handler";
import { authRoute } from "./routes/auth";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * Express application instance.
 * @constant {express.Application}
 */
const app = express();

/**
 * Port number for the server to listen on.
 * @constant {number|string}
 */
const port = process.env.PORT || 3000;

// settings
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.set("port", port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// add production settings
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  app.set("view cache", true);
}

// add development settings
if (process.env.NODE_ENV === "development") {
  app.set("view cache", false);
}

app.get("/api", (req, res, next) => {
  res.status(200).json({ message: "Welcome to the social api" });
});
app.use("/api/auth", authRoute);

// catch global errors
app.use(errorHandler);

/**
 * Starts the server and listens on the specified port.
 * @function
 */

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server on port ${app.get("port")}`);
  });
});

/**
 * Handles graceful shutdown on SIGINT signal.
 * @event
 */
process.on("SIGINT", () => {
  console.log("Server shutting down");
  process.exit();
});

/**
 * Handles graceful startup on SIGUSR2 signal.
 * @event
 */
process.on("SIGUSR2", () => {
  console.log("Server starting up");
});
