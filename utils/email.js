const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWROD,
    },
    // Activate "less secure app" option in gmail!
  });

  // 2) define the email options
  const mailoptions = {
    from: 'Brainilio <brainilioir@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.body,
    // html:
  };

  // 3) actually send the email
  await transporter.sendMail(mailoptions);
};

module.exports = sendEmail;
