"use strict";

const { Types } = require("mongoose");
const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  constructor(keyTokenModel) {
    this.keyTokenModel = keyTokenModel;
  }

  static async createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    try {
      // public key sinh ra boi thuat toan bat doi xung nen no la buffer chua duoc hash
      // => toString de luu vao db

      // level 0
      // const publicKeyString = publicKey.toString();
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey: publicKeyString,
      // });
      // return tokens ? tokens.publicKey : null;

      // level xxx
      const filter = { user: userId },
        update = {
          refreshToken,
          $setOnInsert: {
            publicKey,
            privateKey,
          },
        },
        options = { new: true, upsert: true };
      const tokens = await keyTokenModel.findOneAndUpdate(
        { user: userId },
        {
          refreshToken,
          $setOnInsert: { publicKey, privateKey },
        },
        { upsert: true, new: true },
      );
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      throw new Error("Error creating key token");
    }
  }

  async getKeyTokensByUser(user) {
    return await this.keyTokenModel.find({ user });
  }

  async deleteKeyToken(id) {
    return await this.keyTokenModel.findByIdAndDelete(id);
  }

  static async findByUserId(userId) {
    return await keyTokenModel
      .findOne({ user: new Types.ObjectId(userId) })
      .lean();
  }

  static async removeKeyById(id) {
    return await keyTokenModel.findByIdAndDelete(id);
  }
}

module.exports = KeyTokenService;
