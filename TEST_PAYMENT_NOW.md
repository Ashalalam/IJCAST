# 🧪 Test Your Payment Integration NOW

## ✅ Status: Ready to Test

Your dev server is running at `http://localhost:5173`

## 🚀 Test Steps

### Step 1: Open Payment Form
1. Open browser
2. Go to: `http://localhost:5173/apc`
3. Scroll down and click **"Proceed to Payment"**

### Step 2: Fill Payment Form
Fill the form with test data:

```
Author Name: Test Author
Email: test@example.com
Phone: +919876543210
Manuscript ID: TEST-001
Author Type: 🇮🇳 Indian Author
GASF Membership: (leave empty)
```

### Step 3: Verify Calculation
You should see:
```
Payment Summary
----------------
Author Type: Indian
Total Amount: INR 2000
```

### Step 4: Submit Payment
1. Click **"Pay INR 2000"** button
2. Browser console will show: 
   ```
   ⚠️ Running locally - using placeholder return URL
   ```
3. You'll see "Creating payment order..."

### Expected Results

#### ✅ Success Scenario:
1. Order created successfully
2. Redirected to Cashfree payment page
3. You'll see Cashfree payment options:
   - UPI
   - Cards
   - Net Banking
4. **For testing:** You can either:
   - Complete a real test payment (small amount)
   - Use Cashfree test credentials if available
   - Stop here (order creation confirmed)

#### ❌ If you see an error:
Check browser console for details and report the exact error message.

## 🎯 What This Test Proves

✅ **Frontend → Edge Function:** Working
✅ **Edge Function → Cashfree API:** Working  
✅ **Payment Order Creation:** Working
✅ **HTTPS Validation:** Working (using placeholder)

⚠️ **Not Tested Yet (needs production deployment):**
- Return redirect to your actual success page
- Webhook notification
- Database update to PAID status

## 📝 Test Different Scenarios

### Test 1: Indian Author (Non-Member)
- Author Type: Indian
- GASF Membership: (empty)
- **Expected Amount:** ₹ 2,000

### Test 2: Indian Author (Member)
- Author Type: Indian
- GASF Membership: GASF12345
- **Expected Amount:** ₹ 1,200 (40% discount)

### Test 3: Foreign Author (Non-Member)
- Author Type: Foreign
- GASF Membership: (empty)
- **Expected Amount:** USD 40

### Test 4: Foreign Author (Member)
- Author Type: Foreign
- GASF Membership: GASF12345
- **Expected Amount:** USD 24 (40% discount)

## 🐛 Common Issues & Solutions

### Issue 1: Form doesn't submit
**Check:** Browser console for JavaScript errors
**Solution:** Make sure all required fields are filled

### Issue 2: "Missing required fields: returnUrl"
**This should NOT happen** - the code automatically adds returnUrl
**If you see this:** Report it immediately

### Issue 3: "Return URL must use HTTPS"
**This should NOT happen locally** - we added localhost fallback
**If you see this:** Check the updated paymentService.js was saved

### Issue 4: "authentication Failed"
**Check:** Supabase secrets are configured correctly
```bash
supabase secrets list
```

## 📊 What to Look For

### In Browser Console:
```javascript
⚠️ Running locally - using placeholder return URL. Deploy to HTTPS domain for production.
Creating payment order...
Edge function error: [should be empty if working]
```

### In Network Tab:
```
POST https://ccethswedisoehyxujqt.supabase.co/functions/v1/create-cashfree-order
Status: 200 OK
Response: {
  "success": true,
  "data": {
    "orderId": "IJCAST_TEST-001_...",
    "paymentSessionId": "session_xxx...",
    "orderAmount": 2000,
    "orderCurrency": "INR"
  }
}
```

## 🎯 Success Criteria

You'll know it's working when you see:
1. ✅ Form validates correctly
2. ✅ Amount calculates properly (with/without discount)
3. ✅ "Creating payment order..." message appears
4. ✅ "Redirecting to payment gateway..." message appears
5. ✅ Browser redirects to Cashfree payment page
6. ✅ Cashfree shows payment options (UPI/Cards/Net Banking)

## 🚀 After Testing Locally

Once local testing works:
1. Deploy frontend to Vercel/Netlify (see PAYMENT_READY.md)
2. Update FRONTEND_URL secret with your domain
3. Test full payment flow with real redirect
4. Configure Cashfree webhook
5. Complete end-to-end test payment

---

**Ready to test? Go to: http://localhost:5173/apc**
