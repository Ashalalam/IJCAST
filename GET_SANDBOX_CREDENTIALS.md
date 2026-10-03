# 🔑 How to Get Cashfree Sandbox Credentials

## 🎯 **The Problem:**
You're using **production credentials** (`cfsk_ma_prod_...`) with **sandbox environment**. This doesn't work!

## ✅ **Solution: Get Sandbox Credentials**

### Step 1: Login to Cashfree Dashboard
- **URL:** https://merchant.cashfree.com/
- **Login** with your account

### Step 2: Switch to Test Environment
1. **Navigate to:** Developers → API Keys
2. **Look for environment toggle** (Production/Test or Live/Sandbox)
3. **Switch to:** Test/Sandbox environment

### Step 3: Get Test Credentials
You should see different credentials:
```
App ID: 1234567890123456 (same or different)
Secret Key: cfsk_ma_test_xxxxxxxxx (notice "test" instead of "prod")
```

### Step 4: Update Your .env File
Replace in your `.env` file:
```env
# Current (won't work)
CASHFREE_SECRET_KEY=cfsk_ma_prod_7ac501bd5af9c3fla1113fe339c75310_ebaf2aca

# Update to (will work)  
CASHFREE_SECRET_KEY=cfsk_ma_test_your_sandbox_key_here
```

## 🔍 **What to Look For:**

### **Sandbox Credentials Format:**
- App ID: Usually same as production
- Secret Key: **cfsk_ma_test_** (starts with "test")

### **Production Credentials Format:**
- App ID: Usually same as sandbox  
- Secret Key: **cfsk_ma_prod_** (starts with "prod")

## 💡 **Alternative: Use Production Mode**

If you want to use your current production credentials:

Update `.env` file:
```env
CASHFREE_ENVIRONMENT=production
VITE_CASHFREE_ENVIRONMENT=production
```

But this requires:
- ✅ Complete business verification
- ✅ Active Cashfree production account
- ❌ Real money transactions (not good for testing)

## 🎯 **Recommended Approach:**

1. **Get sandbox credentials** for testing
2. **Test thoroughly** with sandbox
3. **Switch to production** when ready to go live

---

**Once you get the correct sandbox credentials, your authentication will work!**