/**
 * @file index.ts
 * @description Entry point for the social-api application. Sets up the Express server, middleware, and configuration settings.
 */
import fs from "fs";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDb } from "./utils/db";
import { errorHandler } from "./middleware/error-handler";
import { authRoute } from "./routes/auth";
import { postRoute } from "./routes/post";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * Express application instance.
 * @constant {express.Application}
 */
const app = express();

// settings
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

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

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);

// catch global errors
app.use(errorHandler);

/**
 * mongose connection
 * @function
 */
connectDb();

// export
export default app;
