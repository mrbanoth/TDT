import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

interface DonationData {
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
  createdAt: Date;
}

export const generateReceipt = async (donation: DonationData) => {
  // Create a new PDF document
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    bufferPages: true
  });

  // Create a unique filename
  const fileName = `receipt_${donation.id}.pdf`;
  const dirPath = path.join(process.cwd(), 'public', 'receipts');
  const filePath = path.join(dirPath, fileName);

  // Ensure the directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Pipe the PDF into a file
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Add content to the PDF
  doc
    .fontSize(20)
    .text('TRIBAL DEVELOPMENT TRUST', { align: 'center' })
    .moveDown(0.5);

  doc
    .fontSize(12)
    .text('Registration No: 1234567890', { align: 'center' })
    .text('80G No: AAATD1234XF', { align: 'center' })
    .text('PAN: AAATD1234X', { align: 'center' })
    .moveDown(1);

  doc
    .fontSize(16)
    .text('DONATION RECEIPT', { align: 'center', underline: true })
    .moveDown(1);

  // Receipt details
  const receiptDetails = [
    { label: 'Receipt No', value: donation.id },
    { label: 'Date', value: format(new Date(donation.createdAt), 'dd/MM/yyyy') },
    { label: 'Name', value: donation.name },
    { label: 'Email', value: donation.email },
    { label: 'Phone', value: donation.phone || 'N/A' },
    { label: 'PAN', value: donation.pan || 'N/A' },
    { label: 'Donation Type', value: donation.type },
    { label: 'Amount', value: `₹${donation.amount.toLocaleString('en-IN')}` },
    { label: 'Amount in Words', value: amountInWords(donation.amount) },
  ];

  // Add receipt details
  receiptDetails.forEach(({ label, value }) => {
    doc
      .fontSize(12)
      .text(`${label}:`, { continued: true, width: 150, align: 'left' })
      .text(value, { width: 300, align: 'left' })
      .moveDown(0.3);
  });

  // Add 80G certificate if PAN is provided
  if (donation.pan) {
    doc.addPage()
      .fontSize(14)
      .text('80G CERTIFICATE', { align: 'center', underline: true })
      .moveDown(1)
      .fontSize(10)
      .text('This is to certify that we have received a donation of ' + 
            `₹${donation.amount.toLocaleString('en-IN')} (${amountInWords(donation.amount)} only) ` +
            `from ${donation.name} on ${format(new Date(donation.createdAt), 'dd/MM/yyyy')}.`)
      .moveDown(1)
      .text('This donation is eligible for 50% tax exemption under section 80G of the Income Tax Act, 1961.')
      .moveDown(2)
      .text('For TRIBAL DEVELOPMENT TRUST', { align: 'right' })
      .moveDown(3)
      .text('Authorized Signatory', { align: 'right' });
  }

  // Finalize the PDF
  doc.end();

  // Wait for the write stream to finish
  await new Promise<void>((resolve) => {
    stream.on('finish', () => {
      resolve();
    });
  });

  return `/receipts/${fileName}`;
};

// Helper function to convert amount to words
function amountInWords(amount: number): string {
  const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const formatTens = (num: number): string => {
    if (num < 10) return single[num];
    if (num < 20) return double[num - 10];
    return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + single[num % 10] : '');
  };

  const num = Math.floor(amount);
  if (num === 0) return 'Zero';
  
  const convert = (num: number): string => {
    if (num < 100) return formatTens(num);
    if (num < 1000) return single[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + formatTens(num % 100) : '');
    if (num < 100000) return convert(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + convert(num % 1000) : '');
    if (num < 10000000) return convert(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + convert(num % 100000) : '');
    return convert(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + convert(num % 10000000) : '');
  };

  return convert(num) + ' Rupees Only';
}
