const crypto = require("crypto");
const { Vonage } = require("@vonage/server-sdk");
const { hashOtp } = require('./hash-service.js')

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

async function generateOtp() {
  const otp = crypto.randomInt(1000, 9999);
  return otp;
}

 async function sendBySms(phone , otp) {
  const from = "Vonage APIs";
  const to = phone;
  const text = `Your OTP for ChatHouse is ${otp}`;

  async function sendSMS() {
    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log("Message sent successfully");
        // console.log(resp);
      })
      .catch((err) => {
        console.log("There was an error sending the messages.");
        console.error(err);
      });
  }
  sendSMS();
}

async function verifyOtp( hashedOtp , data) {
    const computedOtp = hashOtp(data);

    return computedOtp === hashedOtp;
}

module.exports = {
  generateOtp,
  sendBySms,
  verifyOtp,
};
