const roomModel = require("../models/room-model");

async function create(payload) {
  const { topic, roomType, ownerId } = payload;

  const room = await roomModel.create({
    topic,
    roomType,
    ownerId,
    speakers: [ownerId],
  });

  return room;
}

async function getAllRooms(roomTypes) {
  return await roomModel
    .find({ roomType: { $in: roomTypes } })     // populate function of mongoose will populate the actual document instead of id
    .populate("speakers")
    .populate("ownerId")
    .exec();
}

module.exports = {
  create,
  getAllRooms,
};
