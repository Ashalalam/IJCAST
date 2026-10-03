# 🎯 Single Environment File Setup

## ✅ **Now Using ONE .env File!**

I've simplified the configuration so you only need to update **ONE file**: `.env` in your main project folder.

## 📝 **What You Need to Update**

**File:** `c:\Users\saile\Desktop\gyan\IJCAST\.env`

Find these lines and replace with your actual credentials:

```env
# Cashfree Configuration
VITE_CASHFREE_APP_ID=PUT_YOUR_ACTUAL_APP_ID_HERE
CASHFREE_APP_ID=PUT_YOUR_ACTUAL_APP_ID_HERE
CASHFREE_SECRET_KEY=PUT_YOUR_ACTUAL_SECRET_KEY_HERE
```

## 🔧 **Example Setup**

If your Cashfree credentials are:
- **App ID:** `123456789012345`
- **Secret Key:** `cfsk_ma_prod_abcdef123456`

Then update these lines in `.env`:

```env
# Cashfree Configuration (Frontend & Backend)
VITE_CASHFREE_ENVIRONMENT=production
VITE_CASHFREE_APP_ID=123456789012345

# Backend-only Cashfree Configuration
CASHFREE_APP_ID=123456789012345
CASHFREE_SECRET_KEY=cfsk_ma_prod_abcdef123456
CASHFREE_ENVIRONMENT=production
```

## 🚀 **That's It!**

**Benefits of Single File:**
- ✅ Only ONE file to manage
- ✅ No confusion about which file to edit  
- ✅ All configuration in one place
- ✅ Easier to backup and deploy

## 🧪 **Test Your Setup**

1. **Update the .env file** with your real credentials
2. **Start both servers:**
   ```bash
   npm run dev:all
   ```
3. **Test payment:** Visit http://localhost:5173/apc

## 📁 **File Structure Now**

```
IJCAST/
├── .env                    ← 🎯 ONLY file you need to edit!
├── api/
│   ├── server.js          ← Reads from ../env
│   ├── config/            ← All read from main .env
│   └── services/          ← All read from main .env
└── src/
    └── (frontend files)   ← Uses VITE_ variables from .env
```

## 🔒 **Security Note**

The `.env` file contains sensitive information. Make sure:
- ✅ It's in `.gitignore` (already done)
- ✅ Never commit it to Git
- ✅ Keep backups secure

**Now you only need to update ONE file and everything works!** 🎉