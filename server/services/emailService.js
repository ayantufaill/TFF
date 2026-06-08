const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.resend.com',
      port: parseInt(process.env.EMAIL_PORT, 10) || 465,
      secure: parseInt(process.env.EMAIL_PORT, 10) === 465, // true for port 465, false for other ports like 587
      auth: {
        user: process.env.EMAIL_USER || 'resend',
        pass: process.env.EMAIL_PASS
      }
    });

    // 2) Define the email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html
    };

    // 3) Actually send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully via SMTP:', info.messageId);
    return info;
  } catch (err) {
    console.error('❌ Error in sendEmail:', err.message);
    throw err;
  }
};

module.exports = sendEmail;
