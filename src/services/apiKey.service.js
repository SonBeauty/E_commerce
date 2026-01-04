"use strict";

const apiKeyModel = require("../models/apiKey.model");
const crypto = require("crypto");

const findById = async (key) => {
  try {
    // const newKey = await apiKeyModel.create({
    //   key: crypto.randomBytes(64).toString("hex"),
    //   permissions: ["0000"],
    // });
    // console.log("newKey", newKey);
    return await apiKeyModel.findOne({ key, status: true }).lean();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findById,
};
