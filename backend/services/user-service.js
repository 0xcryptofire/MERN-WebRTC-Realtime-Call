const UserModel = require('../models/user-model');

async function findUser(filter) {
    const user =  await UserModel.findOne(filter);
    return user;
}
async function createUser(data) {
    const user =  await UserModel.create(data);
    return user;
}

module.exports = {
    findUser,
    createUser,
}