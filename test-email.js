import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testEmailConfig() {
  try {
    console.log('Testing email configuration...');
    
    // Check if environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('Missing SMTP credentials in environment variables');
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    await transporter.verify();
    console.log('✅ Email configuration is valid!');
    
    // Send test email
    const info = await transporter.sendMail({
      from: `"TDT Test" <${process.env.SMTP_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email',
      text: 'This is a test email from TDT server.'
    });
    
    console.log('✅ Test email sent:', info.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
  }
}

testEmailConfig();
