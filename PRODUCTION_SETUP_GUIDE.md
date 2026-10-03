# IJCAST Cashfree Production Setup Guide 🚀

## 🎯 Getting Real Cashfree Production Credentials

To get your **actual production credentials** and move from sandbox to live payments, follow these steps:

### Step 1: Complete Business Verification

1. **Sign up for Cashfree Business Account**
   - Visit: https://www.cashfree.com/
   - Click "Get Started" or "Sign Up"
   - Choose "Business Account"

2. **Complete KYB (Know Your Business)**
   - Upload business registration documents
   - Provide PAN/GST details
   - Submit bank account details
   - Add authorized signatory details

3. **Verification Process**
   - Cashfree will verify your documents (1-3 business days)
   - They may request additional documents
   - You'll receive email updates on verification status

### Step 2: Get Production API Credentials

Once your business is verified:

1. **Login to Cashfree Dashboard**
   - Go to: https://merchant.cashfree.com/
   - Login with your verified account

2. **Navigate to API Section**
   - Go to "Developers" → "API Keys"
   - Switch to "Production" environment
   - You'll see your production credentials

3. **Copy Your Credentials**
   ```
   Client ID: CF123456ABCDEFGH (example)
   Client Secret: cfsk_ma_prod_xxxxxxxxxxxxxxxxxxxx (example)  
   App ID: 123456789012345 (example)
   ```

### Step 3: Update Your Environment Files

**Update Backend (`api/.env`):**
```env
# Cashfree Production Configuration
CASHFREE_CLIENT_ID=CF123456ABCDEFGH
CASHFREE_CLIENT_SECRET=cfsk_ma_prod_xxxxxxxxxxxxxxxxxxxx
CASHFREE_ENVIRONMENT=production
CASHFREE_APP_ID=123456789012345
```

**Update Frontend (`.env`):**
```env
# Cashfree Production Configuration
VITE_CASHFREE_ENVIRONMENT=production
VITE_CASHFREE_APP_ID=123456789012345
```

### Step 4: Production Webhook Configuration

1. **In Cashfree Dashboard:**
   - Go to "Developers" → "Webhooks"
   - Add your production webhook URL:
   ```
   https://your-domain.com/api/webhooks/cashfree
   ```

2. **Select Events:**
   - ✅ `PAYMENT_SUCCESS_WEBHOOK`
   - ✅ `PAYMENT_FAILED_WEBHOOK`
   - ✅ `PAYMENT_USER_DROPPED_WEBHOOK`

3. **Save Configuration**

---

## 🏗️ Complete Production Deployment Checklist

### Environment Configuration

**Backend Production Environment:**
```env
# Server Configuration
PORT=3001
NODE_ENV=production

# Cashfree Production Configuration  
CASHFREE_CLIENT_ID=your_real_production_client_id
CASHFREE_CLIENT_SECRET=your_real_production_client_secret
CASHFREE_ENVIRONMENT=production
CASHFREE_APP_ID=your_real_production_app_id

# Supabase Production
SUPABASE_URL=https://your-prod-supabase.supabase.co
SUPABASE_SERVICE_KEY=your_production_service_key

# Security
JWT_SECRET=your_strong_production_jwt_secret
WEBHOOK_SECRET=your_production_webhook_secret

# Production URLs
FRONTEND_URL=https://your-domain.com
API_BASE_URL=https://api.your-domain.com
```

**Frontend Production Environment:**
```env
# API Configuration
VITE_API_BASE_URL=https://api.your-domain.com

# Cashfree Production
VITE_CASHFREE_ENVIRONMENT=production
VITE_CASHFREE_APP_ID=your_real_production_app_id

# Supabase Production
VITE_SUPABASE_URL=https://your-prod-supabase.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

---

## 🛡️ Production Security Checklist

### ✅ Required Security Measures

- [ ] **HTTPS Everywhere** - SSL certificates for all domains
- [ ] **Environment Variables** - Never commit real credentials to Git
- [ ] **Webhook Signature Verification** - Validate all incoming webhooks
- [ ] **Rate Limiting** - Protect against abuse
- [ ] **Input Validation** - Sanitize all user inputs
- [ ] **CORS Configuration** - Restrict API access
- [ ] **Database Security** - Row Level Security (RLS) enabled
- [ ] **Monitoring Setup** - Error tracking and alerts
- [ ] **Backup Strategy** - Database and file backups

### 🔒 Credential Security

**Never expose in frontend:**
- ❌ Client Secret
- ❌ Service Role Key
- ❌ Webhook Secret

**Safe for frontend:**
- ✅ Client ID (public)
- ✅ App ID (public)
- ✅ Anonymous Key (public)
- ✅ Environment (production/sandbox)

---

## 📊 Production Testing Strategy

### 1. Staging Environment Testing

Before going live, test on staging with production credentials:

```bash
# Create staging environment
cp .env .env.staging

# Update staging URLs
FRONTEND_URL=https://staging.your-domain.com
API_BASE_URL=https://api-staging.your-domain.com
```

### 2. Test Scenarios in Production

**Real Payment Testing:**
- Use actual payment methods (small amounts)
- Test all payment flows (success/failure/cancel)
- Verify webhook delivery
- Check database records
- Test email notifications

**Load Testing:**
- Simulate multiple concurrent payments
- Test API rate limits
- Monitor response times
- Check database performance

### 3. Go-Live Checklist

- [ ] **Domain Setup** - Production domains configured
- [ ] **SSL Certificates** - HTTPS enabled
- [ ] **DNS Configuration** - All records pointing correctly
- [ ] **Database Migration** - Production data migrated
- [ ] **Monitoring Active** - Error tracking enabled
- [ ] **Backup Verified** - Backup systems working
- [ ] **Team Notified** - Support team ready
- [ ] **Rollback Plan** - Emergency rollback procedure ready

---

## 🚀 Deployment Options

### Option 1: Vercel + Railway (Recommended)

**Frontend (Vercel):**
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

**Backend (Railway):**
1. Connect GitHub repository
2. Set environment variables in Railway
3. Configure custom domain

### Option 2: AWS/DigitalOcean

**Frontend:**
- Deploy to S3 + CloudFront or DigitalOcean Apps

**Backend:**
- Deploy to EC2/Droplet with PM2 process manager
- Use nginx as reverse proxy
- Set up SSL with Let's Encrypt

### Option 3: Docker Deployment

```dockerfile
# Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

---

## 📈 Production Monitoring

### Key Metrics to Monitor

1. **Payment Success Rate**
   - Target: >95% success rate
   - Alert: <90% success rate

2. **API Response Times**
   - Target: <2s for payment creation
   - Alert: >5s response time

3. **Webhook Delivery**
   - Target: 100% delivery within 30s
   - Alert: Failed webhooks

4. **Database Performance**
   - Monitor query execution times
   - Track connection pool usage

### Monitoring Tools

**Error Tracking:**
- Sentry.io for error monitoring
- LogRocket for session replays

**Uptime Monitoring:**
- Pingdom or UptimeRobot
- Monitor critical endpoints

**Performance Monitoring:**
- New Relic or DataDog
- Monitor API performance

---

## 🆘 Production Support

### Emergency Contacts

**Cashfree Support:**
- Email: support@cashfree.com
- Phone: +91-80-61779797
- Priority support for verified businesses

**Technical Issues:**
- Monitor server logs
- Check Cashfree dashboard for payment status
- Verify webhook delivery in Cashfree logs

### Common Production Issues

1. **Payment Failures**
   - Check Cashfree dashboard for details
   - Verify bank/card issuer restrictions
   - Check for API rate limits

2. **Webhook Failures**
   - Verify webhook URL accessibility
   - Check signature verification
   - Monitor server logs for errors

3. **Database Issues**
   - Check Supabase dashboard
   - Verify connection limits
   - Monitor query performance

---

## 📞 Getting Help

### Cashfree Resources

- **Documentation:** https://docs.cashfree.com/
- **API Reference:** https://docs.cashfree.com/reference
- **Integration Guides:** https://docs.cashfree.com/docs
- **Support Portal:** https://support.cashfree.com/

### Business Verification Help

**If verification is stuck:**
1. Check email for document requests
2. Contact Cashfree support directly
3. Provide all requested documents promptly
4. Follow up regularly on status

**Required Documents (typically):**
- Business registration certificate
- PAN card
- Bank account details
- GST registration (if applicable)
- Authorized signatory ID proof

---

## 🎉 Go Live!

Once you have your production credentials:

1. **Update environment files** with real credentials
2. **Deploy to production** servers
3. **Update Cashfree webhooks** with production URLs
4. **Test with small amounts** first
5. **Monitor closely** for first 24 hours
6. **Announce to users** when confident

**🚀 Your IJCAST payment gateway will be live with real Cashfree production payments!**

---

*Need help getting production credentials? Contact Cashfree support or follow their business verification process.*