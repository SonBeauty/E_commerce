const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const KeyTokenService = require("../services/KeyToken.service");

const HEADER = {
  API_FKEY: "x-api-key",
  AUTHORIZATION: "authorization",
  CLIENT_ID: "x-client-id",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      expiresIn: "2 days",
      // dung cai nay phai pem
      algorithm: "RS256",
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
      // dung cai nay phai pem
      algorithm: "RS256",
    });

    JWT.verify(accessToken, publicKey, (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err);
      } else {
        console.log("JWT verification successful:", decoded);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error creating token pair:", error.message);
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  /**
   * 1 - Check userId missing??
   * 2 - get accesstoken
   * 3 - verify token
   * 4 - check user in db
   * 5 - check keyStore with userId
   * 6 - Ok all -> return next()
   */

  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid request");

  //2
  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found key store");

  //3
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request");

  try {
    const decodedUser = JWT.verify(accessToken, keyStore.publicKey, {
      algorithms: ["RS256"],
    });
    if (userId !== decodedUser.userId)
      throw new AuthFailureError("Invalid user");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTokenPair,
  authentication,
};
