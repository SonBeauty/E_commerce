"use strict";

const mongoose = require("mongoose");

const connectString = "mongodb://localhost:27017/shopDev";

mongoose
  .connect(connectString)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//dev

if (1 === 0) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
