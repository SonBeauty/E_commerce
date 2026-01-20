"use strict";

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  fs.readFile("./bigfile.txt", (err, data) => {
    if (err) throw err;

    fs.writeFile("./bigfile_copy.txt", data, (err) => {
      res.end("success without Stream 8000");
    });
  });
});

server.listen(8000);
process.title = "node 8000";

// cpu memory 706,4 MB

// luu toan bo data vao cache, tra ve toan bo data
