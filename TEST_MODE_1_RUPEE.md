# ⚠️ TESTING MODE - ₹1 PAYMENT ENABLED

## Current Status: TEST MODE

The payment system is currently configured to charge **₹1 (One Rupee)** for all payments instead of actual APC amounts.

This is for **TESTING PURPOSES ONLY**.

---

## What's Changed

### Edge Function: `create-cashfree-order`
- **Current Amount:** ₹1 for all orders
- **Actual Amounts (Disabled):**
  - Indian Non-Member: ₹2,000
  - Indian GASF Member: ₹1,200
  - Foreign Non-Member: USD 40
  - Foreign GASF Member: USD 24

---

## Testing Instructions

### Test Payment Flow

1. Go to: `http://localhost:5173/apc` (or your production URL)
2. Click: "Proceed to Payment"
3. Fill the form with any test data
4. You'll see the amount calculated as normal (₹2,000, ₹1,200, etc.)
5. But Cashfree will charge: **₹1 only**
6. Complete payment with ₹1
7. Verify success page shows up

### What to Check

- ✅ Payment order creation
- ✅ Cashfree payment page loads
- ✅ ₹1 payment completes successfully
- ✅ Redirect to success page
- ✅ Database updated with payment record
- ✅ Webhook notification received (if configured)

---

## ⚠️ IMPORTANT: Switch to Production Rates

Once testing is complete, you MUST restore actual pricing before accepting real payments.

### How to Restore Actual Rates

**Step 1: Edit Edge Function**

Open: `supabase/functions/create-cashfree-order/index.ts`

**Step 2: Find the Test Code (around line 117)**

Remove the test code block:
```typescript
// FOR TESTING: Use ₹1 for all payments
// TODO: Remove this and uncomment actual rates for production
return {
  amount: 1,
  currency: 'INR',
  originalAmount: 1,
  discountPercent: 0,
  discountAmount: 0,
  isMember
};
```

**Step 3: Uncomment Production Code**

Remove the comment markers from:
```typescript
/* ACTUAL PRODUCTION RATES - Uncomment when ready for real payments
const rates = {
  indian: {
    nonMember: 2000,
    member: 1200
  },
  ...
}
...
*/
```

Should become:
```typescript
const rates = {
  indian: {
    nonMember: 2000,
    member: 1200
  },
  ...
}
...
```

**Step 4: Deploy Updated Function**
```bash
supabase functions deploy create-cashfree-order
```

**Step 5: Test One Payment**

Test with actual amount to ensure it works correctly.

---

## Testing Checklist

Before switching to production:

- [ ] Tested ₹1 payment successfully
- [ ] Payment redirects to success page
- [ ] Database records payment correctly
- [ ] Webhook updates payment status (if configured)
- [ ] Verified in Cashfree dashboard
- [ ] All payment scenarios tested (Indian/Foreign, Member/Non-member)
- [ ] **Restored actual pricing** in Edge Function
- [ ] **Deployed production Edge Function**
- [ ] **Tested one real payment** with actual amount
- [ ] **Deleted this file** (TEST_MODE_1_RUPEE.md)

---

## Quick Commands

### Check Current Deployment
```bash
supabase functions list
```

### View Function Code
```bash
# Open in editor
code supabase/functions/create-cashfree-order/index.ts
```

### Deploy After Changes
```bash
supabase functions deploy create-cashfree-order
```

---

## Security Note

**DO NOT FORGET** to restore actual pricing before going live!

Accepting real payments with ₹1 pricing would result in:
- ❌ Loss of revenue
- ❌ Invalid payment records
- ❌ Confused authors
- ❌ Accounting issues

---

## Current Deployment

- **Date:** October 3, 2026
- **Mode:** Testing (₹1)
- **Function Version:** 15
- **Status:** ⚠️ DO NOT USE FOR REAL PAYMENTS

---

**Remember:** This is temporary for testing only!

**Action Required:** Switch to production rates after successful testing.

**Delete this file** when production rates are restored.
