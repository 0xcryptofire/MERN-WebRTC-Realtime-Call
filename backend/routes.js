const router = require('express').Router();
const { sendOtp , otpVerify } = require('./controllers/auth-controller');
const { activate , refresh } = require('./controllers/activate-controller');
const { authMiddleware } = require('./middlewares/auth-middleware');
 

router.post('/api/send-otp' , sendOtp )
router.post('/api/verify-otp' , otpVerify )
router.post('/api/activate',authMiddleware,activate)
router.get('/api/refresh',refresh)

module.exports = router;