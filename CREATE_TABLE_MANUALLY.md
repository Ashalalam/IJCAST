# 🔧 Fix "Failed to store payment record" Error

## 🚨 Issue: Invalid Supabase Service Key

The error occurs because either:
1. The Supabase service key is invalid/expired
2. The `apc_payments` table doesn't exist in your database

## ✅ **Solution: Create Table Manually**

### Step 1: Get New Service Key

1. **Go to Supabase Dashboard:** https://supabase.com/dashboard
2. **Select your project:** ccethswedisoehyxujqt
3. **Go to Settings → API**
4. **Copy the `service_role` key** (not the anon key)
5. **Update your `.env` file:**
   ```env
   SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.NEW_SERVICE_KEY_HERE
   ```

### Step 2: Create Payment Table

1. **Go to Supabase Dashboard**
2. **Click on "SQL Editor"**
3. **Create new query**
4. **Paste this SQL:**

```sql
-- Create APC Payments table for IJCAST
CREATE TABLE IF NOT EXISTS apc_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR(255) UNIQUE NOT NULL,
  cashfree_order_id VARCHAR(255),
  cashfree_payment_id VARCHAR(255),
  
  -- Author Information
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  author_phone VARCHAR(20) NOT NULL,
  manuscript_id VARCHAR(100) NOT NULL,
  
  -- Payment Details
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  payment_status VARCHAR(50) DEFAULT 'PENDING',
  payment_method VARCHAR(100),
  
  -- GASF Membership
  gasf_membership VARCHAR(50),
  is_member BOOLEAN DEFAULT FALSE,
  discount_applied INTEGER DEFAULT 0, -- Percentage
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_apc_payments_order_id ON apc_payments(order_id);
CREATE INDEX IF NOT EXISTS idx_apc_payments_cashfree_order_id ON apc_payments(cashfree_order_id);
CREATE INDEX IF NOT EXISTS idx_apc_payments_author_email ON apc_payments(author_email);
CREATE INDEX IF NOT EXISTS idx_apc_payments_manuscript_id ON apc_payments(manuscript_id);
CREATE INDEX IF NOT EXISTS idx_apc_payments_status ON apc_payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_apc_payments_created_at ON apc_payments(created_at);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create trigger for automatic updated_at
CREATE OR REPLACE TRIGGER update_apc_payments_updated_at
    BEFORE UPDATE ON apc_payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE apc_payments ENABLE ROW LEVEL SECURITY;

-- Create policy for full access (since we use app-level auth)
CREATE POLICY "Allow All APC Payments" ON apc_payments FOR ALL USING (true) WITH CHECK (true);

-- Add table comment
COMMENT ON TABLE apc_payments IS 'Store APC (Article Processing Charge) payment records for IJCAST journal';
```

5. **Click "Run"** to execute the SQL

### Step 3: Verify Table Creation

After running the SQL, you should see:
- ✅ Table `apc_payments` created
- ✅ Indexes created
- ✅ RLS policies applied

### Step 4: Test Payment Flow

1. **Restart your servers:**
   ```bash
   npm run dev:all
   ```

2. **Test payment:**
   - Visit: http://localhost:5173/apc
   - Click "Proceed to Payment"
   - Fill out the form
   - Submit payment

## 🔍 **Alternative: Quick Service Key Check**

To verify your service key is working:

1. **Go to Supabase Dashboard**
2. **SQL Editor**
3. **Run this simple test:**
   ```sql
   SELECT 'Connection works!' as message;
   ```

If this works, your service key is fine and you just need to create the table.

## ⚡ **Quick Fix Commands**

If you want to test without the database temporarily:

1. **Comment out database calls in the backend**
2. **Or set up a local database**
3. **Or use the existing Supabase with the correct service key**

## 🎯 **Most Likely Fix**

The issue is probably just that the `apc_payments` table doesn't exist. Create it using the SQL above and your payment system should work perfectly!

**After creating the table, your payment integration will be fully functional.** ✅