const crypto = require('crypto')

 async function generateOtp() {
    const otp = crypto.randomInt(1000 , 9999)
    return otp;
}

function sendBySms() {
    
}

function verifyOtp() {
    
}

module.exports={
    generateOtp,
    sendBySms,
    verifyOtp
}
