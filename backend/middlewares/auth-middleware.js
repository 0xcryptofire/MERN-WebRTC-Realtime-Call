const { verifyAccessToken } = require("../services/token-service");

async function authMiddleware(req, res, next) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }

    const userData = await verifyAccessToken(accessToken);
    if (!userData) {
        throw new Error();
    }
    req.user = userData;    // req.user is nothing but a custom key of req object.Which can be inserted from any route by pointing req object.
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = {
  authMiddleware,
};
