require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const app = express();
const morgan = require("morgan");
//init middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev")); // hien thi request len console

// app.use(morgan("combined")); // production
// app.use(morgan("common")); // theo doi request binh thuong
// morgan("short"); // theo doi request ngan gon
// morgan("tiny"); // theo doi request cuc ky ngan gon

app.use(helmet()); // bao ve thong tin header, tranh doc cookie
// curl http://localhost:3000/ --include

app.use(compression()); // nen giam size du lieu tra ve
//init db
const { checkOverload } = require("./helpers/check.connect");
checkOverload();
//init route
app.use("", require("./routes"));

require("./dbs/init.mongdb");

//handle error
// middleware 3 parameter
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//error middleware 4 parameter
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
