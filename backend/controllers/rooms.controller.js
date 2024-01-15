const { create, getAllRooms , getSingleRoom } = require('../services/room-service')

async function createRoom(req,res) {
    const { topic , roomType} = req.body;
    
    if (!topic || !roomType) {
        return res.status(400).json({
            message : 'All fields are required..'
        })
    }

    const room = await create({
        topic,
        roomType,
        ownerId : req.user._id,
    })

    return res.json(room);
}

async function getRooms(req , res) {
    const rooms = await getAllRooms(['open' , 'social' , 'private']);

    return res.json(rooms)
}

async function getRoom(req ,res) {
    const roomId = req.params.roomId;
    const room = await getSingleRoom(roomId);

    res.json(room)
}

module.exports = {
    createRoom,
    getRooms,
    getRoom
}