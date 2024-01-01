const {
    generateOtp
}   = require('../services/otp-service')
const {
    hashOtp
}   = require('../services/hash-service')

async function sendOtp(req, res) {

    const { phone } = req.body;

    if (!phone) {
        res.status(400).json({
            message : 'Phone number is required!'
        })
    }

    // generating OTP
    const otp = await generateOtp();
    console.log(otp);

    // hashing OTP 
    const ttl = 1000 * 60 * 2 ;  // time limit of 2 min
    const expires = Date.now() + ttl ; // time to show for expiry 

    const data = `${phone}.${otp}.${expires}`
    const hash = hashOtp(data);
    console.log(hash);

  res.json({
    otp : otp,
    hash : hash
  });
}

module.exports = {
  sendOtp,
};
