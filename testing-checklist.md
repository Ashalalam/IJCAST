# IJCAST Cashfree Integration Testing Checklist

## Pre-Deployment Testing

### 1. Environment Setup
- [ ] Supabase Edge Functions deployed successfully
- [ ] Cashfree production credentials set as Supabase secrets
- [ ] Frontend environment variables configured
- [ ] Database schema up-to-date with apc_payments table

### 2. Payment Flow Testing
- [ ] APC form loads without errors
- [ ] Amount calculation works correctly (Indian/Foreign, Member/Non-member)
- [ ] Form validation prevents invalid submissions
- [ ] Order creation succeeds with valid data
- [ ] Cashfree SDK loads and initializes correctly
- [ ] Payment session ID is received from Edge Function

### 3. Payment Gateway Integration
- [ ] Cashfree checkout opens successfully
- [ ] Production environment is being used (not sandbox)
- [ ] Payment methods are available
- [ ] Test payment can be completed

### 4. Webhook Processing
- [ ] Webhook URL configured in Cashfree dashboard
- [ ] Webhook signature verification works
- [ ] Payment status updates correctly in database
- [ ] Idempotent processing prevents duplicates

### 5. Payment Success Flow
- [ ] Success page displays correct payment details
- [ ] Payment verification works from frontend
- [ ] Database records are accurate and complete
- [ ] No sensitive data exposed to frontend

### 6. Error Handling
- [ ] Invalid payment data is rejected
- [ ] Network errors are handled gracefully
- [ ] Failed payments show appropriate error messages
- [ ] Cancelled payments are handled correctly
- [ ] Edge Function errors don't expose sensitive info

## Production Deployment Testing

### 1. Domain Configuration
- [ ] Production domain set in FRONTEND_URL secret
- [ ] Cashfree webhook URL updated for production
- [ ] SSL certificates valid
- [ ] CORS headers work for production domain

### 2. Security Testing
- [ ] Secret key never exposed to browser
- [ ] Server-side amount validation prevents tampering
- [ ] RLS policies prevent unauthorized access
- [ ] Webhook signatures verified correctly
- [ ] No SQL injection vulnerabilities

### 3. Performance Testing
- [ ] Edge Functions respond within reasonable time
- [ ] Database operations are optimized
- [ ] Concurrent payments handled correctly
- [ ] No memory leaks in long-running functions

### 4. Monitoring Setup
- [ ] Edge Function logs accessible
- [ ] Database monitoring configured
- [ ] Payment failure alerts set up
- [ ] Webhook delivery monitoring enabled

## Test Scenarios

### Valid Payment Scenarios
1. **Indian Author - Non-member**
   - Amount: ₹2000
   - Expected: Successful payment, correct amount

2. **Indian Author - GASF Member**
   - Amount: ₹1200 (40% discount)
   - Expected: Discount applied, successful payment

3. **Foreign Author - Non-member**
   - Amount: $40
   - Expected: USD payment, correct amount

4. **Foreign Author - GASF Member**
   - Amount: $24 (40% discount)
   - Expected: Discount applied, USD payment

### Error Scenarios
1. **Invalid Form Data**
   - Missing required fields
   - Invalid email format
   - Invalid phone number
   - Expected: Form validation errors

2. **Network Issues**
   - Edge Function timeout
   - Cashfree API unavailable
   - Expected: Graceful error handling

3. **Payment Failures**
   - Insufficient funds
   - Card declined
   - Payment timeout
   - Expected: Failed status, appropriate messaging

4. **Security Tests**
   - Modified payment amount in request
   - Invalid webhook signatures
   - Unauthorized database access attempts
   - Expected: Requests rejected, no data corruption

## Post-Deployment Verification

### 1. Live Payment Test
- [ ] Complete one actual payment with small amount
- [ ] Verify funds are received in Cashfree dashboard
- [ ] Check database record is accurate
- [ ] Confirm webhook processing worked

### 2. Documentation
- [ ] Update production webhook URL
- [ ] Document any configuration changes
- [ ] Update monitoring procedures
- [ ] Prepare troubleshooting guide

### 3. Support Preparation
- [ ] Support team trained on new system
- [ ] Payment issue escalation process defined
- [ ] Contact information updated
- [ ] Refund process documented

## Rollback Plan
- [ ] Previous API endpoints still accessible if needed
- [ ] Database backup created before deployment
- [ ] Edge Function rollback procedure documented
- [ ] Emergency contact information available

## Success Criteria
✅ All test scenarios pass
✅ No critical errors in production
✅ Payment success rate > 95%
✅ Average response time < 5 seconds
✅ Zero security vulnerabilities
✅ Monitoring alerts working