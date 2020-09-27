const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
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

  console.log(transporter.options.host);

  // 3) actually send the email
  await transporter.verify((err) => {
    if (err) console.error(err);
    console.log('Your config is correct');
  });

  await transporter.sendMail(mailoptions);
};

module.exports = sendEmail;
