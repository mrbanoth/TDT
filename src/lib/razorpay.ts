// Razorpay service for secure payment processing
export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface RazorpayResponse {
  success: boolean;
  order?: RazorpayOrder;
  error?: string;
  message?: string;
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  verified?: boolean;
  payment_id?: string;
  order_id?: string;
  error?: string;
  message?: string;
}

class RazorpayService {
  private baseURL: string;

  constructor() {
    // Use the same origin since we're proxying through Vite
    this.baseURL = import.meta.env.VITE_API_URL || 
                   (import.meta.env.DEV ? 'http://localhost:3001' : '');
  }

  async createOrder(amount: number, currency: string = 'INR'): Promise<RazorpayResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `receipt_${Date.now()}`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      return data;
    } catch (error: any) {
      console.error('Razorpay order creation error:', error);
      return {
        success: false,
        error: 'ORDER_CREATION_FAILED',
        message: error.message || 'Failed to create payment order'
      };
    }
  }

  async verifyPayment(paymentData: PaymentVerificationRequest): Promise<PaymentVerificationResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment verification failed');
      }

      return data;
    } catch (error: any) {
      console.error('Razorpay payment verification error:', error);
      return {
        success: false,
        error: 'PAYMENT_VERIFICATION_FAILED',
        message: error.message || 'Failed to verify payment'
      };
    }
  }

  loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      
      document.body.appendChild(script);
    });
  }

  async initializePayment(
    order: RazorpayOrder,
    options: {
      name?: string;
      description?: string;
      image?: string;
      prefill?: {
        name?: string;
        email?: string;
        contact?: string;
      };
      notes?: {
        [key: string]: string;
      };
      theme?: {
        color?: string;
      };
    } = {}
  ): Promise<any> {
    try {
      await this.loadRazorpayScript();

      const razorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: options.name || 'Tribal Development Trust',
        description: options.description || 'Donation for Tribal Communities',
        image: options.image || 'https://localhost:8080/tdtlogo.jpg',
        prefill: {
          name: options.prefill?.name || '',
          email: options.prefill?.email || '',
          contact: options.prefill?.contact || '',
        },
        notes: options.notes || {},
        theme: {
          color: options.theme?.color || '#EA580C',
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
          },
          escape: true,
          handleback: true,
          confirm: true,
          animation: 'slideFromBottom',
        },
        // Explicitly enable UPI and other payment methods
        method: {
          upi: true,          // ✅ REQUIRED: Enable UPI
          card: true,         // ✅ Enable cards
          netbanking: true,   // ✅ Enable net banking
          wallet: true,       // ✅ Enable wallets
          emi: false,         // ❌ Disable EMI for donations
          paylater: false     // ❌ Disable Pay Later for donations
        },
        // Configure UPI display
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay via UPI',
                instruments: [
                  {
                    method: 'upi',
                    flows: {
                      collect: {
                        name: 'UPI Collect',
                        description: 'Pay via UPI QR'
                      },
                      intent: {
                        name: 'UPI Intent', 
                        description: 'Pay via UPI Apps'
                      }
                    }
                  }
                ]
              }
            },
            sequence: ['block.upi', 'block.card', 'block.netbanking'],
            preferences: {
              show_default_blocks: true
            }
          }
        }
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      return razorpay;
    } catch (error: any) {
      console.error('Razorpay initialization error:', error);
      throw new Error('Failed to initialize payment');
    }
  }
}

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const razorpayService = new RazorpayService();
