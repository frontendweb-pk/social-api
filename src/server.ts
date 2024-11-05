import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import cluster from "cluster";
import app from "./app";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  const numCPUs = require("os").cpus().length;
  console.log("numCPUs", numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const HTTP_PORT = 80;
  const HTTPS_PORT = 443;

  // options
  const options = {
    cert: fs.readFileSync(path.resolve(__dirname, "./cert.pem")),
    key: fs.readFileSync(path.resolve(__dirname, "./key.pem")),
  };

  // Create and start HTTP server
  const httpServer = http.createServer(app);
  httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP server running on port ${HTTP_PORT}`);
  });

  // Create and start HTTPS server
  const httpsServer = https.createServer(options, app);
  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS server running on port ${HTTPS_PORT}`);
  });
  // Handle graceful shutdown on SIGINT
  process.on("SIGINT", () => {
    console.log("Gracefully shutting down servers...");

    // Close HTTP server
    httpServer.close(() => {
      console.log("HTTP server closed.");
    });

    // Close HTTPS server
    httpsServer.close(() => {
      console.log("HTTPS server closed.");
      process.exit(0); // Exit after all servers are closed
    });
  });

  // Handle startup signal (SIGUSR2)
  process.on("SIGUSR2", () => {
    console.log("Received SIGUSR2 signal - Starting up server...");
    // This signal doesn't need to exit the process.
  });
}
