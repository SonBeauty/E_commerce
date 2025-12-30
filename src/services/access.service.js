const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { access } = require("fs");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  signUp = async ({ name, email, password }) => {
    try {
      const hodelShop = await shopModel.findOne({ email }).lean(); // return object javascript

      if (hodelShop) {
        return {
          code: "20002",
          message: "This email is already in use.",
          status: 400,
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        //created private key, public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        console.log({ privateKey, publicKey }); // save collection keys
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: 500,
      };
    }
  };
}

module.exports = new AccessService();
m;
