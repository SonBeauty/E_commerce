"use strict";

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  const readStream = fs.createReadStream("./bigfile.txt");
  const writeStream = fs.createWriteStream("./bigfile_copy.txt");

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    res.end("success with Stream 8000");
  });
});

server.listen(8001);
process.title = "node 8001";

// cpu memory 25 MB

// luu tru 1 phan data tren bo nho, khong luu toan bo data vao cache,
// tra ve tung phan data
