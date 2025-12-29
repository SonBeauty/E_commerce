"use strict";

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {
  db: { host, name, port },
} = require("../configs/config.mongodb");

const connectString = `mongodb://${host}:${port}/${name}`;
//dev
class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongo") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 50, // Giới hạn số kết nối trong pool, cải thiện hiệu suất
        // neu vuot qua thi se bi tu choi ket noi, doi ket noi xu ly xong, se xep hang
      })
      .then(() => {
        console.log("MongoDB connected", countConnect());
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  }
  static getInstance() {
    // phai dung static vi singleton cam new nhieu lan
    // ✔️ Gọi không cần instance
    // ✔️ Kiểm soát số lần tạo instance
    // ✔️ Đúng nghĩa Factory / Singleton
    if (!Database.instance) {
      //instance là property của constructor
      // Không nằm trong prototype
      // Tồn tại suốt đời process
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
// const database = new Database();
const instanceMongoDB = Database.getInstance(); // export kieu nay de khong ai goi new Database tao connect moi

module.exports = instanceMongoDB;
