const Jimp = require("jimp"); // for image compression
const path = require("path");
const { findUser } = require("../services/user-service");
const {
  verifyRefeshToken,
  findRefreshToken,
  generateTokens,
  updateRefreshToken,
} = require("../services/token-service");

async function activate(req, res) {
  const { name, avatar } = req.body;
  if (!name || !avatar) {
    res.status(400).json({
      message: "All Fields are required",
    });
  }

  // image base64 -> buffer type
  const buffer = Buffer.from(
    avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    "base64"
  );

  const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

  // compressing image
  try {
    const jimpres = await Jimp.read(buffer);
    jimpres
      .resize(150, Jimp.AUTO)
      .write(path.resolve(__dirname, `../storage/${imagePath}`)); // storing to /storage
  } catch (error) {
    res.status(500).json({
      message: "Couldn't process the image",
    });
  }

  // update user
  const userId = req.user._id;

  try {
    const user = await findUser({ _id: userId });
    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
    }

    user.activated = true;
    user.name = name;
    user.avatar = `${process.env.BASE_URL}/storage/${imagePath}`;
    user.save();

    res.json({
      user,
      auth: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function refresh(req, res) {
  // get refresh token from cookie
  const { refreshToken: refreshTokenFromcookies } = req.cookies;
  // chaeck if token is valid
  let userData;
  try {
    userData = await verifyRefeshToken(refreshTokenFromcookies);
    if (!userData) {
      throw new Error();
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
  // check if token is in database or not
  try {
    const token = await findRefreshToken(userData._id, refreshTokenFromcookies);
    if (!token) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
    });
  }
  // check if valid user
  const user = await findUser({ _id: userData._id });
  if (!user) {
    return res.status(404).json({
      message: "No user found",
    });
  }
  // generate new tokens
  const { accessToken, refreshToken } = await generateTokens({
    _id: userData._id,
  });
  // update refresh token
  try {
    await updateRefreshToken(userData._id, refreshToken);
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
    });
  }
  // set  new tokens in cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
    httpOnly: true,
  });

  // response 
  res.json({
    user,
    auth : true
  })
}

module.exports = {
  activate,
  refresh,
};
