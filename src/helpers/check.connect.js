"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5 * 1000;
// count active connections
const countConnect = () => {
  const connection = mongoose.connections.length;
  console.log(`Number of connections: ${connection}`);
};

// check over load
const checkOverload = () => {
  setInterval(() => {
    const connection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    // example maximum connection
    const maxConnections = numCores * 5;

    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);
    if (connection > maxConnections) {
      console.warn(`Connection overload detected: ${connection} connections`);
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
