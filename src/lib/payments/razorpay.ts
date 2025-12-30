import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

export const createOrder = async (amount: number, receipt: string) => {
  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: 'INR',
    receipt: receipt,
    payment_capture: 1
  };

  try {
    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error };
  }
};

export const verifyPayment = async (orderId: string, paymentId: string, signature: string) => {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '');
  hmac.update(orderId + '|' + paymentId);
  const generatedSignature = hmac.digest('hex');
  
  return generatedSignature === signature;
};
