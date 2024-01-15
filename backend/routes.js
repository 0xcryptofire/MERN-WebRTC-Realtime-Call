const router = require('express').Router();
const { authMiddleware } = require('./middlewares/auth-middleware');
const { sendOtp , otpVerify , logout } = require('./controllers/auth-controller');
const { activate , refresh } = require('./controllers/activate-controller');
const { createRoom, getRoom , getRooms }  = require('./controllers/rooms.controller');

 
router.post('/api/send-otp' , sendOtp )
router.post('/api/verify-otp' , otpVerify )
router.post('/api/activate',authMiddleware,activate)
router.get('/api/refresh',refresh)
router.post('/api/logout',authMiddleware,logout)
router.post('/api/rooms',authMiddleware,createRoom)
router.get('/api/rooms',authMiddleware,getRooms)
router.get('/api/rooms/:roomId',authMiddleware,getRoom)

module.exports = router;