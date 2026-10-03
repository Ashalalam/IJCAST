# IJCAST Cashfree Payment Integration Guide

## Overview

This guide provides complete setup instructions for the Cashfree payment gateway integration for Article Processing Charges (APC) in the IJCAST journal website.

## 🚀 Quick Setup Summary

### Files Created/Modified

**Backend API Files:**
- `api/package.json` - Backend dependencies
- `api/server.js` - Express server setup
- `api/.env` - Backend environment variables
- `api/config/cashfree.js` - Cashfree configuration
- `api/config/supabase.js` - Database configuration
- `api/services/cashfreeService.js` - Cashfree API integration
- `api/services/paymentService.js` - Payment logic and calculations
- `api/routes/payment.js` - Payment API endpoints
- `api/routes/webhook.js` - Cashfree webhook handlers

**Frontend Files:**
- `src/pages/APC.jsx` - Updated APC page with payment form
- `src/components/common/APCPaymentForm.jsx` - Payment form component
- `src/services/paymentService.js` - Frontend payment utilities
- `src/pages/PaymentSuccess.jsx` - Payment success page
- `src/pages/PaymentFailed.jsx` - Payment failure page
- `src/App.jsx` - Added payment routes
- `.env` - Updated with API and payment configuration

**Database:**
- `supabase/migrations/001_create_apc_payments.sql` - Payment records table

## 📋 Environment Variables Required

### Backend (`api/.env`)

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Cashfree Configuration
CASHFREE_CLIENT_ID=your_actual_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_actual_cashfree_client_secret
CASHFREE_ENVIRONMENT=sandbox
# Change to 'production' for live environment

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Security
JWT_SECRET=your_random_jwt_secret_key
WEBHOOK_SECRET=your_cashfree_webhook_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
API_BASE_URL=http://localhost:3001
```

### Frontend (`.env`)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001

# Cashfree Environment
VITE_CASHFREE_ENVIRONMENT=sandbox

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗️ Setup Instructions

### 1. Database Setup (Supabase)

1. **Run the migration:**
   ```sql
   -- Execute the SQL in: supabase/migrations/001_create_apc_payments.sql
   -- This creates the apc_payments table with proper indexes and RLS
   ```

2. **Verify table creation:**
   - Check Supabase dashboard for `apc_payments` table
   - Ensure RLS policies are enabled

### 2. Cashfree Dashboard Configuration

1. **Create Cashfree Account:**
   - Sign up at https://www.cashfree.com/
   - Complete business verification
   - Get sandbox credentials for testing

2. **Get API Credentials:**
   - Navigate to Developers > API Keys
   - Copy Client ID and Client Secret
   - Note the App ID for webhook setup

3. **Configure Webhooks:**
   ```
   Webhook URL: https://your-domain.com/api/webhooks/cashfree
   
   Events to subscribe:
   - PAYMENT_SUCCESS_WEBHOOK
   - PAYMENT_FAILED_WEBHOOK  
   - PAYMENT_USER_DROPPED_WEBHOOK
   ```

4. **Payment Methods:**
   - Enable desired payment methods in dashboard
   - Configure UPI, Cards, Net Banking as needed
   - Set up settlement accounts

### 3. Backend API Setup

1. **Install dependencies:**
   ```bash
   cd api
   npm install
   ```

2. **Configure environment:**
   - Copy `api/.env` template
   - Update with actual Cashfree and Supabase credentials

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Verify API endpoints:**
   ```bash
   # Health check
   curl http://localhost:3001/health
   
   # Should return: {"status": "OK", "message": "IJCAST API is running"}
   ```

### 4. Frontend Setup

1. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

2. **Update environment variables:**
   - Ensure `.env` has correct API_BASE_URL

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 🧪 Testing Instructions

### Local Testing

1. **Start both servers:**
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend API
   cd api
   npm run dev
   ```

2. **Test payment flow:**
   - Navigate to http://localhost:5173/apc
   - Click "Proceed to Payment"
   - Fill in test details:
     - Use any valid email/phone
     - Test manuscript ID: "TEST-001"
     - Select author type
   - Click "Pay Now"

3. **Test with Cashfree sandbox:**
   - Use Cashfree test card numbers
   - Test UPI VPA: `success@payu`
   - Test different scenarios (success/failure)

### Test Scenarios

1. **Successful Payment:**
   - Use valid test credentials
   - Should redirect to payment success page
   - Check database for payment record

2. **Failed Payment:**
   - Use invalid/expired test cards
   - Should redirect to failure page
   - Verify error handling

3. **GASF Membership Discount:**
   - Enter any membership number
   - Verify 40% discount calculation
   - Test for both Indian and Foreign authors

## 🚀 Production Deployment

### 1. Environment Setup

**Backend Environment:**
```env
NODE_ENV=production
CASHFREE_ENVIRONMENT=production
FRONTEND_URL=https://your-domain.com
API_BASE_URL=https://api.your-domain.com
```

**Frontend Environment:**
```env
VITE_API_BASE_URL=https://api.your-domain.com
VITE_CASHFREE_ENVIRONMENT=production
```

### 2. Cashfree Production Setup

1. **Switch to production:**
   - Complete Cashfree business verification
   - Get production API credentials
   - Update webhook URLs to production domain

2. **Security checklist:**
   - ✅ Client Secret only in backend
   - ✅ Webhook signature verification enabled
   - ✅ HTTPS for all endpoints
   - ✅ Rate limiting configured
   - ✅ Input validation on all endpoints

### 3. Deployment Steps

1. **Deploy backend API:**
   - Deploy to your preferred hosting (AWS, Heroku, DigitalOcean)
   - Ensure environment variables are set
   - Test health endpoint

2. **Deploy frontend:**
   - Build and deploy React app
   - Ensure API URLs point to production backend

3. **Update Cashfree webhooks:**
   - Update webhook URL in Cashfree dashboard
   - Test webhook delivery

## 🔧 API Endpoints

### Payment Endpoints

```
POST /api/payments/create-order
- Creates new payment order
- Body: { authorName, authorEmail, authorPhone, manuscriptId, authorType, gasfMembership, amount, currency }
- Returns: { orderId, cashfreeOrderId, paymentSessionId, checkoutUrl }

POST /api/payments/verify-payment  
- Verifies payment status
- Body: { orderId }
- Returns: { paymentStatus, orderAmount, paymentMethod, transactionId }

GET /api/payments/history
- Payment history (requires authentication in production)
```

### Webhook Endpoints

```
POST /api/webhooks/cashfree
- Handles Cashfree webhook notifications
- Verifies signature and updates payment status
- Processes: PAYMENT_SUCCESS, PAYMENT_FAILED, PAYMENT_USER_DROPPED
```

## 💡 APC Pricing Structure

| Author Type | Non-Member | GASF Member (40% off) |
|-------------|------------|----------------------|
| Indian      | ₹ 2,000    | ₹ 1,200             |
| Foreign     | USD 40     | USD 24              |

## 🔒 Security Features

- ✅ **Server-side amount validation** - Never trust frontend amounts
- ✅ **Webhook signature verification** - Validates Cashfree webhooks
- ✅ **Rate limiting** - Prevents abuse
- ✅ **Input validation** - Joi schema validation
- ✅ **CORS configuration** - Restricts API access
- ✅ **Environment variable protection** - Secrets only in backend
- ✅ **Duplicate order prevention** - Unique order ID generation

## 🐛 Troubleshooting

### Common Issues

1. **Payment order creation fails:**
   - Check Cashfree credentials
   - Verify API environment (sandbox/production)
   - Check request payload format

2. **Webhook not received:**
   - Verify webhook URL in Cashfree dashboard
   - Check server logs for webhook errors
   - Ensure HTTPS in production

3. **Database connection issues:**
   - Verify Supabase credentials
   - Check RLS policies
   - Ensure service key has proper permissions

4. **CORS errors:**
   - Update FRONTEND_URL in backend .env
   - Check browser network tab for exact error

### Debug Mode

Enable debug logging:
```env
NODE_ENV=development
DEBUG=cashfree:*
```

## 📞 Support

For issues with:
- **Cashfree Integration:** support@cashfree.com
- **Supabase:** support@supabase.com
- **Technical Issues:** Create GitHub issue

## 🔄 Future Enhancements

1. **Admin Dashboard:**
   - Payment management interface
   - Transaction reports
   - Refund processing

2. **Email Notifications:**
   - Payment confirmation emails
   - Receipt generation

3. **Advanced Features:**
   - Installment payments
   - Bulk payment discounts
   - Currency conversion

## 📊 Monitoring

Monitor these metrics:
- Payment success rate
- Average payment time
- Failed payment reasons
- Webhook delivery status
- API response times

## 🎯 Next Steps

1. Test thoroughly in sandbox environment
2. Complete Cashfree production verification
3. Deploy to staging environment
4. Conduct security audit
5. Deploy to production
6. Monitor payment metrics
7. Set up alerting for failures

---

**Last Updated:** $(date)
**Version:** 1.0.0