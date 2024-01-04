const jwt = require('jsonwebtoken');
const refreshModel = require('../models/refreshToken-model')

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET

async function generateTokens(payload) {
    const accessToken = jwt.sign(payload , accessTokenSecret , {
        expiresIn : '1h'
    })
    const refreshToken = jwt.sign(payload , refreshTokenSecret , {
        expiresIn : '1y'
    })

    return {
        accessToken,
        refreshToken,
    }
}

async function storeRefreshToken(token , userId) {
    try {
        await refreshModel.create({
            token : token,
            userId : userId
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    generateTokens,
    storeRefreshToken
}