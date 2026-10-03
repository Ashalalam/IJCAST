# Cashfree Production Payment Integration - HTTPS Fix

## Issue Fixed
Cashfree production API requires HTTPS URLs for `return_url`, but was receiving `http://localhost:5174`.

## Changes Made

### 1. Edge Function Updated (`supabase/functions/create-cashfree-order/index.ts`)
- Added `returnUrl` parameter to request payload
- Added HTTPS validation - rejects non-HTTPS URLs
- Uses client-provided return URL instead of hardcoded placeholder

### 2. Frontend Service Updated (`src/services/paymentService.js`)
- Automatically generates `returnUrl` using `window.location.origin`
- Includes return URL in Edge Function request

### 3. Test File Updated (`test-edge-function.html`)
- Now sends valid HTTPS URL: `https://example.com/payment/success?order_id=test`

### 4. Deployed
```bash
supabase functions deploy create-cashfree-order
```

## Testing

### Current Test Status
Open `test-edge-function.html` in browser and click "Test Complete Payment Order"

**Expected Result:** 
- ✅ Status 200
- ✅ Order created successfully
- ✅ Cashfree payment session ID returned

### For Production Deployment

**You MUST deploy your frontend to an HTTPS domain before accepting real payments.**

#### Option A: Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Option B: Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### After Deployment:
1. Get your production HTTPS URL (e.g., `https://your-app.vercel.app`)
2. Update `.env`:
   ```
   VITE_FRONTEND_URL=https://your-app.vercel.app
   ```
3. Update Supabase secret:
   ```bash
   supabase secrets set FRONTEND_URL=https://your-app.vercel.app
   ```

## Current Configuration

### Edge Function Secrets (Supabase)
- ✅ CASHFREE_APP_ID: `1441120d9e27c52380edb7f14b70211441`
- ✅ CASHFREE_SECRET_KEY: Configured (production)
- ✅ FRONTEND_URL: `https://example.com` (placeholder - update after deployment)

### Cashfree Dashboard
- ✅ Environment: Production
- ✅ Webhook URL: `https://ccethswedisoehyxujqt.supabase.co/functions/v1/cashfree-webhook`
- ⚠️ **Action Required:** Test webhook after first real payment

## Payment Flow

```
User fills form → Frontend validates → Edge Function called
                                              ↓
                                  Edge Function receives:
                                  - Author details
                                  - Manuscript ID
                                  - returnUrl (HTTPS required)
                                              ↓
                                  Validates returnUrl is HTTPS
                                              ↓
                                  Creates Cashfree order
                                              ↓
                                  Returns payment session ID
                                              ↓
User redirected to Cashfree → Pays → Cashfree webhook notifies →
                                              ↓
                                  Database updated to PAID
                                              ↓
                                  User redirected to returnUrl
```

## Security Notes
- ✅ JWT verification disabled for webhook (external Cashfree calls)
- ✅ Secret keys stored in Supabase Edge Function secrets
- ✅ HTTPS enforced for all payment URLs
- ⚠️ **TODO:** Implement Cashfree webhook signature verification

## Next Steps

1. **Test with test file:** Open `test-edge-function.html` → Should see success
2. **Deploy frontend:** Choose Vercel/Netlify for HTTPS domain
3. **Update URLs:** Set production URL in secrets
4. **Test full flow:** Complete a real test payment
5. **Verify webhook:** Check database updates after payment

## Troubleshooting

### Error: "Return URL must use HTTPS"
**Cause:** Frontend not deployed to HTTPS domain
**Fix:** Deploy to Vercel/Netlify and update FRONTEND_URL secret

### Error: "authentication Failed"
**Cause:** Wrong Cashfree credentials
**Fix:** Verify credentials in Cashfree dashboard match Supabase secrets

### Payment succeeds but database not updated
**Cause:** Webhook not configured or signature verification failing
**Fix:** Add webhook URL in Cashfree dashboard, implement signature verification
