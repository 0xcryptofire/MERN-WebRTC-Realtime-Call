const router = require('express').Router();
const { sendOtp } = require('./controllers/auth-controller');

router.post('/api/send-otp' , sendOtp )

module.exports = router;