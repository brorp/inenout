const nodemailer = require('nodemailer');

const EMAIL_FROM = process.env.NODEMAILER_EMAIL;
const EMAIL_PW = process.env.NODEMAILER_EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PW,
  },
  pool: true,
});

const mailOtp = (emailUser, otpNumber) => {
  return {
    from: EMAIL_FROM,
    to: emailUser,
    subject: '[IN-EN-OUT] Register new user OTP Verification',
    html: `This is your verification code \n <h1>${otpNumber}</h1> \n Input this number to verify your email address.`,
  };
};

const resetPasswordMail = (emailUser, resetLink) => {
  return {
    from: EMAIL_FROM,
    to: emailUser,
    subject: '[IN-EN-OUT] Request reset account password',
    html: `This is your one-time link to reset your password.<br/> <a href="${resetLink}">${resetLink}</a> <br/> Click link to reset password.`,
  };
};

const articlePublish = (emailUser) => {
  return {
    from: EMAIL_FROM,
    to: emailUser,
    subject: '[IN-EN-OUT] Congratulations!',
    html: ``,
  };
};

module.exports = {
  resetPasswordMail,
  mailOtp,
  articlePublish,
  transporter,
};
