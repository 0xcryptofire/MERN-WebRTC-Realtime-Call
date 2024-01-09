const roomModel = require('../models/room-model');


async function create(payload) {
    const { topic , roomType , ownerId } = payload;

    const room = await roomModel.create({
        topic,
        roomType,
        ownerId,
        speakers : [ownerId]
    })

    return room;
}

module.exports = {
    create
}