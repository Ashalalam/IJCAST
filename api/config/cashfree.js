import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export const cashfreeConfig = {
  appId: process.env.CASHFREE_APP_ID,
  secretKey: process.env.CASHFREE_SECRET_KEY,
  environment: process.env.CASHFREE_ENVIRONMENT || 'sandbox',
  
  // Cashfree API URLs
  getBaseUrl() {
    return this.environment === 'production' 
      ? 'https://api.cashfree.com/pg' 
      : 'https://sandbox.cashfree.com/pg';
  },
  
  // API endpoints
  endpoints: {
    createOrder: '/orders',
    getOrder: '/orders',
    getPayments: '/orders',
    refund: '/orders'
  },

  // Default configuration
  defaults: {
    currency: 'INR',
    returnUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success`,
    notifyUrl: `${process.env.API_BASE_URL || 'http://localhost:3001'}/api/webhooks/cashfree`
  }
};

// Validate configuration
export const validateCashfreeConfig = () => {
  const required = ['appId', 'secretKey'];
  const missing = required.filter(key => !cashfreeConfig[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required Cashfree configuration: ${missing.join(', ')}`);
  }
  
  return true;
};