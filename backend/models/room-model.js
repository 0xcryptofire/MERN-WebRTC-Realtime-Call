const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    speakers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required:true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Room", roomSchema, "rooms");
