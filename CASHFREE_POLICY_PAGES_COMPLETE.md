# ✅ Cashfree Policy Pages - Complete

## Overview
All required policy pages for Cashfree payment gateway approval are now implemented and accessible.

---

## ✅ Required Pages Created

### 1. **Contact Us** 
- **URL:** `/contact`
- **Status:** ✅ Already existed
- **Content:** Complete contact information including email, publisher details, and editorial office information

### 2. **Terms & Conditions**
- **URL:** `/terms`
- **Status:** ✅ **NEWLY CREATED**
- **Content Includes:**
  - Acceptance of terms
  - Services offered with pricing in INR
  - User responsibilities
  - Publication charges (APC)
  - Payment terms
  - Copyright and licensing
  - Withdrawal and rejection policy
  - Website usage restrictions
  - Privacy and data protection
  - Limitation of liability
  - Governing law (India)

### 3. **Refunds & Cancellations**
- **URL:** `/refunds`
- **Status:** ✅ **NEWLY CREATED**
- **Content Includes:**
  - General refund policy
  - Eligibility for refunds (100%, 50%, No refund scenarios)
  - Payment cancellation policy
  - Refund request process
  - Refund timeline (15-20 business days)
  - Refund methods
  - Non-refundable items
  - Dispute resolution
  - Failed transaction refunds
  - Contact information for refund assistance

### 4. **Privacy Policy**
- **URL:** `/privacy`
- **Status:** ✅ Already existed
- **Content:** Editorial data protection and privacy statement

---

## 📋 Products/Services Listed with INR Pricing

All pages clearly list the products/services with pricing in INR:

### Article Processing Service (APC)

| Author Type | Non-Member | GASF Member (40% discount) |
|-------------|-----------|---------------------------|
| **Indian Authors** | **INR 2,000** | **INR 1,200** |
| Foreign Authors | USD 40 | USD 24 |

**Services Included:**
- Manuscript processing and formatting
- DOI assignment and registration
- Online hosting and archival
- Open access publication
- Distribution and indexing services

**Other Services (Free):**
- Manuscript submission service - **Free**
- Peer review service - **Free**
- Editorial screening service - **Free**

---

## 🔗 Page Access

All pages are accessible from:

1. **Footer Navigation** (Bottom of every page):
   - Terms & Conditions
   - Privacy Policy
   - Refunds & Cancellations
   - Contact Us

2. **Direct URLs:**
   - https://your-domain.com/terms
   - https://your-domain.com/refunds
   - https://your-domain.com/privacy
   - https://your-domain.com/contact

3. **APC Page:**
   - https://your-domain.com/apc (includes complete pricing details)

---

## ✅ Cashfree Requirements Checklist

- ✅ **Contact Us page** - Complete with email and publisher info
- ✅ **Terms & Conditions** - Comprehensive T&C with all service terms
- ✅ **Refunds & Cancellations** - Detailed refund policy with timelines
- ✅ **Privacy Policy** - Data protection and privacy statement
- ✅ **Products/Services Listed** - APC clearly defined with detailed breakdown
- ✅ **Pricing in INR** - Primary pricing is in INR for Indian authors
- ✅ **Service Description** - Clear description of what APC covers
- ✅ **Refund Timeline** - 15-20 business days clearly stated
- ✅ **Contact Information** - Email provided for support
- ✅ **Dispute Resolution** - Process clearly outlined

---

## 📝 Policy Highlights

### Terms & Conditions Key Points:
- No fee for submission or peer review
- APC payable only after manuscript acceptance
- Clear pricing structure (INR and USD)
- GASF membership discount (40%)
- Payment terms and methods
- Copyright retention by authors
- Governed by laws of India

### Refunds & Cancellations Key Points:
- 100% refund: Within 24 hours or technical errors
- 50% refund: 24-48 hours after payment
- No refund: After 48 hours or post-publication
- 15-20 business day processing timeline
- Refund to original payment method
- Failed transaction auto-refund in 5-7 days
- Clear dispute resolution process

---

## 🚀 Next Steps for Cashfree Approval

### Step 1: Submit for Whitelisting

1. Login to [Cashfree Merchant Dashboard](https://merchant.cashfree.com)
2. Go to **Developers** → **Whitelisting**
3. Add your domain (e.g., `https://your-domain.com`)
4. **Add policy page URLs:**
   ```
   Contact Us: https://your-domain.com/contact
   Terms & Conditions: https://your-domain.com/terms
   Refunds & Cancellations: https://your-domain.com/refunds
   Privacy Policy: https://your-domain.com/privacy
   Products/Services: https://your-domain.com/apc
   ```

### Step 2: Deploy to Production

To get your production domain:

**Option A: Vercel (Recommended)**
```bash
vercel
```

**Option B: Netlify**
```bash
netlify deploy --prod
```

### Step 3: Update Configuration

After deployment:
```bash
# Update Supabase secret
supabase secrets set FRONTEND_URL=https://your-actual-domain.com

# Update .env
VITE_FRONTEND_URL=https://your-actual-domain.com
```

### Step 4: Test Policy Pages

Visit each page to verify they load correctly:
- ✅ https://your-domain.com/terms
- ✅ https://your-domain.com/refunds
- ✅ https://your-domain.com/privacy
- ✅ https://your-domain.com/contact
- ✅ https://your-domain.com/apc

---

## 📄 Documentation Location

### Created Files:
1. `src/pages/Terms.jsx` - Terms & Conditions page
2. `src/pages/Refunds.jsx` - Refunds & Cancellations page
3. `src/App.jsx` - Updated with new routes
4. `src/components/layout/Footer.jsx` - Updated with policy links

### Existing Files:
1. `src/pages/Contact.jsx` - Contact Us page
2. `src/pages/Privacy.jsx` - Privacy Policy page
3. `src/pages/APC.jsx` - Article Processing Charges page

---

## ✅ Compliance Summary

Your IJCAST website now fully complies with Cashfree's policy requirements:

| Requirement | Status | Details |
|-------------|--------|---------|
| Contact Us | ✅ Complete | Email, publisher info, address |
| Terms & Conditions | ✅ Complete | Full T&C with INR pricing |
| Refunds & Cancellations | ✅ Complete | Detailed refund policy |
| Privacy Policy | ✅ Complete | Data protection statement |
| Products Listed | ✅ Complete | APC services clearly defined |
| Pricing in INR | ✅ Complete | INR 2,000 / INR 1,200 |
| Service Description | ✅ Complete | What APC includes |
| Refund Timeline | ✅ Complete | 15-20 business days |
| Contact Information | ✅ Complete | editor.ijcast.in@gmail.com |
| Legal Compliance | ✅ Complete | Governed by Indian law |

---

## 🎉 Ready for Cashfree Approval

Your website is now **fully compliant** with all Cashfree payment gateway requirements!

**Next Action:** Deploy to production and submit your domain for whitelisting in Cashfree dashboard.

---

**Created:** October 3, 2026  
**Status:** ✅ All Requirements Met  
**Action Required:** Deploy to production HTTPS domain
