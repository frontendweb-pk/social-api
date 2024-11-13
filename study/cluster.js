// import express from "express";
// import cluster from 'cluster'
// import process from "process";
// import os, { cpus, availableParallelism } from 'os'



// const app = express();

// const numCPUs = availableParallelism();


// if (cluster.isPrimary) {
//   for (let i = 0; i < numCPUs; i++) {
//     console.log('forking process: ', process.pid)
//     cluster.fork()
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   })
// } else {


//   const port = process.env.PORT || 3000;

//   const data = {
//     cpus: numCPUs,
//     pid: process.pid,
//     platform: process.platform,
//     arch: process.arch,
//     version: process.version,
//     memoryUsage: process.memoryUsage(),
//     uptime: process.uptime(),
//     cpuUsage: process.cpuUsage(),
//     cwd: process.cwd(),
//     parent: process.ppid,
//     // os: os,
//     // process: process,
//     // cluster: cluster
//   }


//   // Middleware
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   app.get("/", (req, res) => {
//     res.json({ m: "Hello World", pid: process.pid });
//   });

//   app.listen(3000, () => {
//     console.log("server is running on port 3000", process.pid);
//   });

// }

import cluster from 'cluster';
import express from 'express';
import { availableParallelism } from 'os';
import process from 'process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = express()

  app.get('/', (req, res) => {
    res.send(`Response ${process.pid} started`)
  })
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);

  })

  // http.createServer((req, res) => {
  //   res.writeHead(200);
  //   res.end('hello world\n');
  // }).listen(8000);

}