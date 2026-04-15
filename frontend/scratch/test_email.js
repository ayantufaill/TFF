require('dotenv').config({ path: '../server/.env' });
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('Testing with:');
  console.log('Host:', process.env.EMAIL_HOST);
  console.log('Port:', process.env.EMAIL_PORT);
  console.log('User:', process.env.EMAIL_USER);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.verify();
    console.log('✅ Connection successful!');
    
    // Optionally send a test email
    /*
    await transporter.sendMail({
      from: '"Test" <test@example.com>',
      to: 'huzaifaras10@gmail.com',
      subject: 'Test Email',
      text: 'If you see this, your .env is correct!'
    });
    console.log('✅ Test email sent!');
    */
  } catch (err) {
    console.error('❌ Connection failed:');
    console.error(err);
  }
}

testEmail();
