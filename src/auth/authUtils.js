const JWT = require("jsonwebtoken");

const createTokenPair = (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      expiresIn: "2 days",
      algorithm: "RS256",
    });

    const refreshToken = JWT.sign({ userId: 1 }, privateKey, {
      expiresIn: "7 days",
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
  } catch (error) {}
};

module.exports = {
  createTokenPair,
};
