const router = require('express').Router();
const { sendOtp , otpVerify } = require('./controllers/auth-controller');

router.post('/api/send-otp' , sendOtp )
router.post('/api/verify-otp' , otpVerify )

module.exports = router;