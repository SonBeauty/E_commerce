const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      expiresIn: "2 days",
      // dung cai nay phai pem
      // algorithm: "RS256",
    });

    const refreshToken = JWT.sign({ userId: 1 }, privateKey, {
      expiresIn: "7 days",
      // dung cai nay phai pem
      // algorithm: "RS256",
    });

    JWT.verify(accessToken, privateKey, (err, decoded) => {
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

module.exports = {
  createTokenPair,
};
