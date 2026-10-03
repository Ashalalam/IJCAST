# 🚀 Quick Setup with Your Cashfree Credentials

Since you have your **App ID** and **Secret Key**, here's how to get your payment gateway running:

## 📝 Step 1: Update Your Credentials

### Backend Configuration (`api/.env`)
Replace these values with your actual Cashfree credentials:

```env
# Cashfree Configuration
CASHFREE_APP_ID=your_actual_app_id_here
CASHFREE_SECRET_KEY=your_actual_secret_key_here
CASHFREE_ENVIRONMENT=production
```

### Frontend Configuration (`.env`)
```env
# Cashfree Configuration (Frontend)
VITE_CASHFREE_ENVIRONMENT=production
VITE_CASHFREE_APP_ID=your_actual_app_id_here
```

## 🔍 Step 2: Find Your Credentials

Your Cashfree credentials should look like:

**App ID:** 
- Format: Usually numeric (e.g., `123456789012345`)
- Location: Cashfree Dashboard → Developers → API Keys

**Secret Key:**
- Format: Starts with `cfsk_` (e.g., `cfsk_ma_test_xxx` for test or `cfsk_ma_prod_xxx` for production)
- Location: Same place as App ID

## ⚙️ Step 3: Environment Check

**If you have TEST credentials:**
```env
CASHFREE_ENVIRONMENT=sandbox
VITE_CASHFREE_ENVIRONMENT=sandbox
```

**If you have PRODUCTION credentials:**
```env
CASHFREE_ENVIRONMENT=production
VITE_CASHFREE_ENVIRONMENT=production
```

## 🧪 Step 4: Test Your Setup

1. **Update your environment files** with real credentials
2. **Restart both servers:**
   ```bash
   npm run dev:all
   ```
3. **Test the payment flow:**
   ```bash
   node test-payment.js
   ```

## 🔧 Step 5: Configure Webhooks

In your Cashfree Dashboard:
1. Go to **Developers → Webhooks**
2. Add webhook URL: `https://your-domain.com/api/webhooks/cashfree`
3. Select events:
   - PAYMENT_SUCCESS_WEBHOOK
   - PAYMENT_FAILED_WEBHOOK
   - PAYMENT_USER_DROPPED_WEBHOOK

## ✅ Step 6: Verify Everything Works

1. **Start servers:** `npm run dev:all`
2. **Visit:** http://localhost:5173/apc
3. **Test payment flow:**
   - Click "Proceed to Payment"
   - Fill form with test details
   - Complete payment process

## 🎯 Example Configuration

Here's what your files should look like:

**`api/.env` example:**
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Cashfree Configuration
CASHFREE_APP_ID=123456789012345
CASHFREE_SECRET_KEY=cfsk_ma_prod_1234567890abcdef
CASHFREE_ENVIRONMENT=production

# Supabase Configuration
SUPABASE_URL=https://ccethswedisoehyxujqt.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Security
JWT_SECRET=your_jwt_secret_key
WEBHOOK_SECRET=your_webhook_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
API_BASE_URL=http://localhost:3001
```

**`.env` example:**
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://ccethswedisoehyxujqt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# API Configuration
VITE_API_BASE_URL=http://localhost:3001

# Cashfree Configuration (Frontend)
VITE_CASHFREE_ENVIRONMENT=production
VITE_CASHFREE_APP_ID=123456789012345
```

## 🚨 Important Notes

1. **Never commit real credentials** to Git
2. **Use production environment** only with real credentials
3. **Test thoroughly** before going live
4. **Set up HTTPS** for production deployment

## 🆘 Troubleshooting

**If you get authentication errors:**
- Double-check your App ID and Secret Key
- Verify the environment (sandbox vs production)
- Make sure credentials are active in Cashfree dashboard

**If payments fail:**
- Check Cashfree dashboard for error details
- Verify webhook URLs are accessible
- Check server logs for detailed errors

## 🎉 You're Ready!

Once you update the credentials, your IJCAST payment gateway will be fully functional with real Cashfree payments! 

**Just replace the placeholder values with your actual App ID and Secret Key.**