"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  constructor(keyTokenModel) {
    this.keyTokenModel = keyTokenModel;
  }

  static async createKeyToken({ userId, publicKey }) {
    try {
      // public key sinh ra boi thuat toan bat doi xung nen no la buffer chua duoc hash
      // => toString de luu vao db
      const publicKeyString = publicKey.toString();
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
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
}

module.exports = KeyTokenService;
