const nodemailer = require("nodemailer");

const mailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "abouba.sang@outlook.com",
      pass: pass,
    },
  });

  return transporter;
};

module.exports = mailTransporter;
