import axios from 'axios';
import crypto from 'crypto';
import { cashfreeConfig, validateCashfreeConfig } from '../config/cashfree.js';

export class CashfreeService {
  constructor() {
    validateCashfreeConfig();
    this.baseUrl = cashfreeConfig.getBaseUrl();
    this.appId = cashfreeConfig.appId;
    this.secretKey = cashfreeConfig.secretKey;
  }

  // Generate authentication headers
  getAuthHeaders() {
    return {
      'accept': 'application/json',
      'content-type': 'application/json',
      'x-client-id': this.appId,
      'x-client-secret': this.secretKey,
      'x-api-version': '2022-09-01'
    };
  }

  // Create payment order
  async createOrder(orderData) {
    try {
      const {
        orderId,
        orderAmount,
        customerName,
        customerEmail,
        customerPhone,
        orderNote,
        returnUrl,
        notifyUrl
      } = orderData;

      const payload = {
        order_id: orderId,
        order_amount: parseFloat(orderAmount),
        order_currency: cashfreeConfig.defaults.currency,
        customer_details: {
          customer_id: `customer_${Date.now()}`,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone
        },
        order_meta: {
          return_url: returnUrl || cashfreeConfig.defaults.returnUrl,
          notify_url: notifyUrl || cashfreeConfig.defaults.notifyUrl
        },
        order_note: orderNote || 'IJCAST Article Processing Charge Payment'
      };

      console.log('Creating REAL Cashfree order:', { orderId, orderAmount, customerEmail });
      console.log('🔑 Using App ID:', this.appId);
      console.log('🔒 Secret Key starts with:', this.secretKey ? this.secretKey.substring(0, 15) + '...' : 'Not set');
      console.log('🌐 API URL:', `${this.baseUrl}${cashfreeConfig.endpoints.createOrder}`);

      const response = await axios.post(
        `${this.baseUrl}${cashfreeConfig.endpoints.createOrder}`,
        payload,
        { headers: this.getAuthHeaders() }
      );

      console.log('✅ REAL Cashfree order created successfully:', response.data.order_id);
      return response.data;
    } catch (error) {
      console.error('❌ REAL Cashfree order creation failed:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        appId: this.appId,
        secretKeyPrefix: this.secretKey ? this.secretKey.substring(0, 15) + '...' : 'Not set',
        url: `${this.baseUrl}${cashfreeConfig.endpoints.createOrder}`
      });
      
      throw new Error(
        error.response?.data?.message || 
        'Failed to create payment order. Please try again.'
      );
    }
  }

  // Get order details
  async getOrder(orderId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}${cashfreeConfig.endpoints.getOrder}/${orderId}`,
        { headers: this.getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch order details:', error.message);
      throw new Error('Failed to fetch order details');
    }
  }

  // Get payment details for an order
  async getPayments(orderId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}${cashfreeConfig.endpoints.getPayments}/${orderId}/payments`,
        { headers: this.getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch payment details:', error.message);
      throw new Error('Failed to fetch payment details');
    }
  }

  // Verify webhook signature
  verifyWebhookSignature(payload, signature, timestamp) {
    try {
      const signatureString = `${timestamp}${JSON.stringify(payload)}`;
      const computedSignature = crypto
        .createHmac('sha256', this.secretKey)
        .update(signatureString)
        .digest('base64');

      return crypto.timingSafeEqual(
        Buffer.from(signature, 'base64'),
        Buffer.from(computedSignature, 'base64')
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error.message);
      return false;
    }
  }
}

export const cashfreeService = new CashfreeService();