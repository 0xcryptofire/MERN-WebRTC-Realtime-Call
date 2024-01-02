const { generateOtp , sendBySms , verifyOtp } = require("../services/otp-service");
const { hashOtp } = require("../services/hash-service");

async function sendOtp(req, res) {
  const { phone } = req.body;

  if (!phone) {
    res.status(400).json({
      message: "Phone number is required!",
    });
  }

  // generating OTP
  const otp = await generateOtp();
  console.log(otp);

  // hashing OTP
  const ttl = 1000 * 60 * 2; // time limit of 2 min
  const expires = Date.now() + ttl; // time to show for expiry

  const data = `${phone}.${otp}.${expires}`;    //using it we generate hash
  const hash = hashOtp(data);
  console.log(hash);

  // sending OTP 

  try {
    await sendBySms(phone,otp);
    res.json({
      hash : `${hash}.${expires}`,
      phone : phone
    })
  } catch (error) {
    console.log('in catch');
    console.log(error);
  }
}

 // verifying OTP

async function otpVerify(req , res) {
  const { phone , otp , hash } = req.body;

  if (!phone || !otp || !hash) {
    res.status(400).json({
      message : 'All field are required'
    })
  }

  const [hashedOtp , expires] = hash.split('.');

  if (Date.now() > expires) {
    res.status(400).json({
      message : 'OTP expired'
    })
  }

  const data = `${phone}.${otp}.${expires}`;

  const isValid = await verifyOtp( hashedOtp , data);

  if (!isValid) {
    res.status(400).json({
      message : 'Invalid OTP'
    })
  }


  let user;
  let accessToken;
  let refreshToken;
  
}
module.exports = {
  sendOtp,
  otpVerify
};
