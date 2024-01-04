const Jimp = require("jimp");       // for image compression
const path = require("path");
const { findUser } = require("../services/user-service");

async function activate(req, res) {
  const { name, avatar } = req.body;
  if (!name || !avatar) {
    res.status(400).json({
      message: "All Fields are required",
    });
  }

  // image base64 -> buffer type
  const buffer = Buffer.from(
    avatar.replace(/^data:image\/png;base64,/, ""),
    "base64"
  );

  const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

  // compressing image
  try {
    const jimpres = await Jimp.read(buffer);
    jimpres
      .resize(150, Jimp.AUTO)
      .write(path.resolve(__dirname, `../storage/${imagePath}`));   // storing to /storage
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
      auth : true
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  activate,
};
