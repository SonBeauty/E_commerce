const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const app = express();
const morgan = require("morgan");
//init middleware
app.use(morgan("dev")); // hien thi request len console

// app.use(morgan("combined")); // production
// app.use(morgan("common")); // theo doi request binh thuong
// morgan("short"); // theo doi request ngan gon
// morgan("tiny"); // theo doi request cuc ky ngan gon

app.use(helmet()); // bao ve thong tin header, tranh doc cookie
app.use(compression()); // nen giam size du lieu tra ve
//init db

//init route
app.get("/", (req, res, next) => {
  const strCompressed = "Hello ";
  return res
    .status(200)
    .json({ message: "Hello World", metadata: strCompressed.repeat(10000) });
});
//handle error

module.exports = app;
