import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

interface DonationData {
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  phone?: string;
  donorPAN?: string;
  amount: number;
  paymentMethod: string;
  address?: string;
  date?: string;
}

const PAGE = {
  WIDTH: 595.28,
  HEIGHT: 841.89,
  MARGIN: 40,
  CONTENT_WIDTH: 515.28,
};

export function generateDonationPDF(data: DonationData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 40, bottom: 40, left: 40, right: 40 },
        bufferPages: true
      });

      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Prevent auto page creation
      (doc as any).addPage = () => doc;

      // Watermark
      const logoPath = path.join(process.cwd(), 'public', 'tdtlogo.jpg');
      if (fs.existsSync(logoPath)) {
        doc.save();
        doc.opacity(0.05);
        doc.image(logoPath, PAGE.MARGIN, 250, {
          width: PAGE.CONTENT_WIDTH
        });
        doc.restore();
      }

      doc.registerFont('Helvetica', 'Helvetica');
      doc.registerFont('Helvetica-Bold', 'Helvetica-Bold');

      let y = PAGE.MARGIN;

      const addText = (
        text: string,
        options: {
          size?: number;
          bold?: boolean;
          align?: 'left' | 'center' | 'right' | 'justify';
          height?: number;
          color?: string;
        } = {}
      ) => {
        const {
          size = 11,
          bold = false,
          align = 'left',
          height = 16,
          color = '#000000'
        } = options;

        doc
          .font(bold ? 'Helvetica-Bold' : 'Helvetica')
          .fontSize(size)
          .fillColor(color)
          .text(text, PAGE.MARGIN, y, {
            width: PAGE.CONTENT_WIDTH,
            align
          });

        y += height;
      };

      const hr = () => {
        y += 6;
        doc
          .moveTo(PAGE.MARGIN, y)
          .lineTo(PAGE.WIDTH - PAGE.MARGIN, y)
          .strokeColor('#cccccc')
          .stroke();
        y += 12;
      };

      // HEADER
      y = 60;
      addText('TRIBAL DEVELOPMENT TRUST', {
        align: 'center',
        size: 18,
        bold: true,
        height: 24,
        color: '#2c3e50'
      });

      addText('Regd. No. 1/IV/2015', { align: 'center', size: 10, height: 14 });
      addText('80G Reg. No.: AACTT8555FF2022101', { align: 'center', size: 10, height: 14 });
      addText('PAN: AACTT8555F', { align: 'center', size: 10, height: 14 });

      y += 6;
      addText('DONATION RECEIPT', {
        align: 'center',
        size: 16,
        bold: true,
        height: 28,
        color: '#e74c3c'
      });

      hr();

      // RECEIPT META
      addText(`Receipt No: ${data.receiptNumber}`, { size: 10 });
      addText(`Date: ${data.date || new Date().toLocaleDateString('en-IN')}`, { size: 10 });

      hr();

      // DONOR DETAILS
      addText('DONOR DETAILS', { bold: true, size: 12, color: '#2c3e50' });
      addText(`Name: ${data.donorName}`, { size: 10 });
      addText(`Email: ${data.donorEmail}`, { size: 10 });

      if (data.phone) addText(`Phone: ${data.phone}`, { size: 10 });
      if (data.donorPAN) addText(`PAN: ${data.donorPAN}`, { size: 10 });
      if (data.address) addText(`Address: ${data.address}`, { size: 10, height: 28 });

      hr();

      // DONATION DETAILS
      addText('DONATION DETAILS', { bold: true, size: 12, color: '#2c3e50' });
      // Convert amount to number and format with 2 decimal places
      const amount = parseFloat(String(data.amount));
      const formattedAmount = isNaN(amount) 
        ? '0.00' 
        : amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
      // Add amount as separate text elements to avoid formatting issues
   doc.font('Helvetica').fontSize(10)
   .text('Amount: INR ', PAGE.MARGIN, y, { continued: true })
   .text(formattedAmount, { continued: false });
      y += 16; // Move to next line
      
      addText(`Payment Method: ${data.paymentMethod || 'Online Payment'}`, { size: 10 });
      addText(`Transaction Reference: TXN-${Date.now()}`, { size: 10 });

      hr();

      // TAX DECLARATION
      addText('TAX EXEMPTION', { bold: true, size: 12, color: '#2c3e50' });

      const taxText =
        'This is to certify that Tribal Development Trust is registered under Section 12A ' +
        'and 80G of the Income Tax Act, 1961. Donations made are eligible for tax exemption ' +
        'as per applicable provisions.';

      doc
        .font('Helvetica')
        .fontSize(10)
        .text(taxText, PAGE.MARGIN, y, {
          width: PAGE.CONTENT_WIDTH,
          align: 'justify'
        });

      y += doc.heightOfString(taxText, {
        width: PAGE.CONTENT_WIDTH
      }) + 16;

      // CONTACT INFORMATION
      const contactY = y + 20;
      doc.font('Helvetica').fontSize(9)
         .text('Contact Us:', PAGE.MARGIN, contactY, { width: PAGE.CONTENT_WIDTH, align: 'left' });
      doc.font('Helvetica').fontSize(9)
         .text('Email: tribaldevelopmenttrust77@gmail.com', PAGE.MARGIN, contactY + 14, { width: PAGE.CONTENT_WIDTH, align: 'left' });
      doc.font('Helvetica').fontSize(9)
         .text('Mobile: +91 82827123', PAGE.MARGIN, contactY + 28, { width: PAGE.CONTENT_WIDTH, align: 'left' });
      doc.font('Helvetica').fontSize(9)
         .text('Website: tribaldevelopmenttrust.org', PAGE.MARGIN, contactY + 42, { width: PAGE.CONTENT_WIDTH, align: 'left' });

      // SIGNATURE AND REGISTRATION DETAILS
      let sigY = PAGE.HEIGHT - 180; // Starting Y position for signature section
      const regDetailsX = PAGE.WIDTH - PAGE.MARGIN - 200; // Right-aligned

      // Add horizontal line
      doc.moveTo(PAGE.MARGIN, sigY - 10)
         .lineTo(PAGE.WIDTH - PAGE.MARGIN, sigY - 10)
         .strokeColor('#cccccc')
         .stroke();

      // Add "Yours Faithfully, Thanking You" text
      doc.font('Helvetica').fontSize(10)
         .text('Yours Faithfully,', PAGE.MARGIN, sigY + 5);
      doc.font('Helvetica').fontSize(10)
         .text('Thanking You.', PAGE.MARGIN, sigY + 20);
         
      // Signature image
      const signPath = path.join(process.cwd(), 'public', 'SIGN.png');
      if (fs.existsSync(signPath)) {
        try {
          // Add signature image (scaled to 100px width, maintaining aspect ratio)
          doc.image(signPath, PAGE.MARGIN, sigY + 40, { width: 100 });
          // Adjust Y position based on image height
          sigY += 60; // Height after signature image
        } catch (error) {
          console.error('Error loading signature image:', error);
          // Fallback to text signature if image fails to load
          doc.font('Helvetica-Bold').fontSize(10)
             .text('For Tribal Development Trust', PAGE.MARGIN, sigY + 40);
        }
      } else {
        // Fallback to text signature if image not found
        doc.font('Helvetica-Bold').fontSize(10)
           .text('For Tribal Development Trust', PAGE.MARGIN, sigY + 40);
      }
      
      // Signature line below the image
      doc.moveTo(PAGE.MARGIN, sigY + 60)
         .lineTo(PAGE.MARGIN + 200, sigY + 60)
         .strokeColor('#000000')
         .stroke();
         
      // Signature label
      doc.font('Helvetica').fontSize(9)
         .text('Authorized Signatory', PAGE.MARGIN, sigY + 65);

      // Registration details on the right
      doc.font('Helvetica-Bold').fontSize(10)
         .text('Registration Details', regDetailsX, sigY, { width: 200, align: 'right' });
         
      doc.font('Helvetica').fontSize(9)
         .text('NGO Reg. No: 1/IV/2015', regDetailsX, sigY + 16, { width: 200, align: 'right' });
         
      doc.font('Helvetica').fontSize(9)
         .text('80 G Reg. No: AACTT8555FF2022101', regDetailsX, sigY + 32, { width: 200, align: 'right' });
         
      doc.font('Helvetica').fontSize(9)
         .text('PAN No: AACTT8555F', regDetailsX, sigY + 48, { width: 200, align: 'right' });

      // FOOTER
      const footerY = PAGE.HEIGHT - 40;

      doc
        .moveTo(PAGE.MARGIN, footerY - 6)
        .lineTo(PAGE.WIDTH - PAGE.MARGIN, footerY - 6)
        .strokeColor('#cccccc')
        .stroke();

      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('#666')
        .text(
          'This is a system-generated receipt. No physical signature is required.',
          PAGE.MARGIN,
          footerY,
          { width: PAGE.CONTENT_WIDTH, align: 'center' }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

export default generateDonationPDF;
