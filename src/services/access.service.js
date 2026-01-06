const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const KeyTokenService = require("./KeyToken.service");
const { BadRequestError } = require("../core/error.response");
const { findByEmail } = require("./shop.service");
const { AuthFailureError } = require("../core/error.response");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  /**
   * 1 - check email
   * 2 - match password
   * 3 - create access token, refresh token
   * 4 - generate token
   * 5 - get data return
   */
  login = async ({ email, password, refreshToken }) => {
    //1
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError("Email not found");
    }

    //2
    const match = await bcrypt.compare(password, foundShop.password);
    if (!match) {
      throw new AuthFailureError("Password is incorrect");
    }

    //3
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    //4
    const tokens = await createTokenPair(
      { userId: foundShop._id },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      publicKey,
      privateKey,
      userId: foundShop._id,
    });

    //5
    return {
      shop: getInfoData({
        fields: ["_id", "name", "email", "roles"],
        object: foundShop,
      }),
      tokens,
    };
  };

  signUp = async ({ name, email, password }) => {
    try {
      const hodelShop = await shopModel.findOne({ email }).lean(); // return object javascript

      if (hodelShop) {
        throw new BadRequestError("This email is already in use.");
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
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });

        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        console.log({ privateKey, publicKey }); // save collection keys

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        console.log("keyStore", keyStore);

        if (!keyStore)
          return { code: "xxx", message: "keyStore error", status: 500 };

        // const publicKeyObject = crypto.createPublicKey(publicKeyString);

        const tokens = await createTokenPair(
          { userId: newShop._id },
          // publicKeyObject,
          publicKey,
          privateKey
        );

        return {
          shop: getInfoData({
            fields: ["_id", "name", "email", "roles"],
            object: newShop,
          }),
          tokens,
        };
      }

      return {
        code: 200,
        metadata: null,
      };
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
