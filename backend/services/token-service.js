const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refreshToken-model");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

async function generateTokens(payload) {
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "1y",
  });

  return {
    accessToken,
    refreshToken,
  };
}

async function storeRefreshToken(token, userId) {
  try {
    await refreshModel.create({
      token: token,
      userId: userId,
    });
  } catch (error) {
    console.log(error);
  }
}

async function verifyAccessToken(token) {
  return jwt.verify(token, accessTokenSecret);
}
async function verifyRefeshToken(refreshToken) {
  return jwt.verify(refreshToken, refreshTokenSecret);
}

async function findRefreshToken(userId, refreshToken) {
  return await refreshModel.findOne({ userId: userId, token: refreshToken });
}
async function updateRefreshToken(userId, refreshToken) {
  return await refreshModel.updateOne(
    { userId: userId },
    { token: refreshToken }
  );
}

module.exports = {
  generateTokens,
  storeRefreshToken,
  verifyAccessToken,
  verifyRefeshToken,
  findRefreshToken,
  updateRefreshToken
};
