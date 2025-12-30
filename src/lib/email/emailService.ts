import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    path: string;
    contentType: string;
  }>;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com', // Update with your SMTP settings
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOptions = {
      from: `"TRIBAL DEVELOPMENT TRUST" <${process.env.SMTP_FROM || 'noreply@tribaldevtrust.org'}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments || [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

export const sendDonationConfirmation = async (
  email: string,
  name: string,
  amount: number,
  type: string,
  receiptPath?: string
) => {
  const emailTemplatePath = path.join(process.cwd(), 'src/emails/donation-confirmation.html');
  let emailTemplate = '';
  
  try {
    emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
  } catch (error) {
    console.error('Error reading email template:', error);
    // Fallback template if file reading fails
    emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Your Donation!</h2>
        <p>Dear ${name},</p>
        <p>We have received your donation of <strong>₹${amount.toLocaleString('en-IN')}</strong> for <strong>${type}</strong>.</p>
        <p>Your support helps us continue our mission to support tribal communities.</p>
        ${receiptPath ? '<p>Please find your receipt attached with this email.</p>' : ''}
        <p>Regards,<br/>TRIBAL DEVELOPMENT TRUST</p>
      </div>
    `;
  }

  const attachments = [];
  if (receiptPath && fs.existsSync(path.join(process.cwd(), 'public', receiptPath))) {
    attachments.push({
      filename: 'Donation_Receipt.pdf',
      path: path.join(process.cwd(), 'public', receiptPath),
      contentType: 'application/pdf',
    });
  }

  return sendEmail({
    to: email,
    subject: 'Thank You for Your Donation - TRIBAL DEVELOPMENT TRUST',
    html: emailTemplate
      .replace(/\$\{name\}/g, name)
      .replace(/\$\{amount\}/g, amount.toLocaleString('en-IN'))
      .replace(/\$\{type\}/g, type),
    attachments,
  });
};

export const sendAdminNotification = async (
  donationData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    amount: number;
    type: string;
    pan?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  },
  receiptPath?: string
) => {
  if (!process.env.ADMIN_EMAIL) {
    console.log('No admin email configured. Skipping admin notification.');
    return { success: false, error: 'No admin email configured' };
  }

  const attachments = [];
  if (receiptPath && fs.existsSync(path.join(process.cwd(), 'public', receiptPath))) {
    attachments.push({
      filename: `Donation_${donationData.id}.pdf`,
      path: path.join(process.cwd(), 'public', receiptPath),
      contentType: 'application/pdf',
    });
  }

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Donation Received</h2>
      <p>A new donation has been received with the following details:</p>
      <ul>
        <li><strong>Donation ID:</strong> ${donationData.id}</li>
        <li><strong>Name:</strong> ${donationData.name}</li>
        <li><strong>Email:</strong> ${donationData.email}</li>
        <li><strong>Phone:</strong> ${donationData.phone || 'N/A'}</li>
        <li><strong>Amount:</strong> ₹${donationData.amount.toLocaleString('en-IN')}</li>
        <li><strong>Type:</strong> ${donationData.type}</li>
        ${donationData.pan ? `<li><strong>PAN:</strong> ${donationData.pan}</li>` : ''}
        ${donationData.address ? `<li><strong>Address:</strong> ${donationData.address}</li>` : ''}
        ${donationData.city || donationData.state || donationData.pincode || donationData.country ? 
          `<li><strong>Location:</strong> ${[donationData.city, donationData.state, donationData.pincode, donationData.country].filter(Boolean).join(', ')}</li>` : ''}
      </ul>
      <p>Receipt is attached.</p>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Donation Received - ${donationData.name} (₹${donationData.amount.toLocaleString('en-IN')})`,
    html: emailContent,
    attachments,
  });
};
