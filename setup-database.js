// Database setup script for IJCAST payment table
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

console.log('🔧 Setting up IJCAST payment database...\n');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration in .env file');
  console.log('Required: SUPABASE_URL and SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('1️⃣ Testing Supabase connection...');
    
    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('journal_settings')
      .select('count(*)')
      .limit(1);
    
    if (testError) {
      console.error('❌ Database connection failed:', testError.message);
      return;
    }
    
    console.log('✅ Supabase connection successful!');
    
    console.log('\n2️⃣ Checking if apc_payments table exists...');
    
    // Check if table exists by trying to select from it
    const { data: tableCheck, error: tableError } = await supabase
      .from('apc_payments')
      .select('count(*)')
      .limit(1);
    
    if (tableError) {
      if (tableError.code === '42P01') { // Table doesn't exist
        console.log('⚠️  apc_payments table does not exist. Creating it...');
        
        // Create the table using raw SQL
        const createTableSQL = `
          -- Create APC Payments table
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
            discount_applied INTEGER DEFAULT 0,
            
            -- Metadata
            metadata JSONB DEFAULT '{}',
            
            -- Timestamps
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          -- Create indexes
          CREATE INDEX IF NOT EXISTS idx_apc_payments_order_id ON apc_payments(order_id);
          CREATE INDEX IF NOT EXISTS idx_apc_payments_status ON apc_payments(payment_status);
          
          -- Enable RLS
          ALTER TABLE apc_payments ENABLE ROW LEVEL SECURITY;
          
          -- Create policy for full access (since we use app-level auth)
          CREATE POLICY "Allow All APC Payments" ON apc_payments FOR ALL USING (true) WITH CHECK (true);
        `;
        
        const { error: createError } = await supabase.rpc('exec_sql', { 
          sql: createTableSQL 
        });
        
        if (createError) {
          console.error('❌ Failed to create table via RPC:', createError.message);
          console.log('\n📋 Please run this SQL manually in Supabase SQL Editor:');
          console.log('=====================================');
          console.log(createTableSQL);
          console.log('=====================================');
        } else {
          console.log('✅ apc_payments table created successfully!');
        }
        
      } else {
        console.error('❌ Table check failed:', tableError.message);
      }
    } else {
      console.log('✅ apc_payments table already exists!');
    }
    
    console.log('\n3️⃣ Testing payment record creation...');
    
    // Test insert
    const testRecord = {
      order_id: `TEST_${Date.now()}`,
      author_name: 'Test Author',
      author_email: 'test@example.com',
      author_phone: '+1234567890',
      manuscript_id: 'TEST-001',
      amount: 2000.00,
      currency: 'INR',
      payment_status: 'PENDING'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('apc_payments')
      .insert([testRecord])
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Test record creation failed:', insertError.message);
    } else {
      console.log('✅ Test record created successfully!');
      console.log('📋 Record ID:', insertData.id);
      
      // Clean up test record
      await supabase
        .from('apc_payments')
        .delete()
        .eq('id', insertData.id);
      
      console.log('🧹 Test record cleaned up');
    }
    
    console.log('\n🎉 Database setup complete!');
    console.log('💡 You can now test payments on: http://localhost:5173/apc');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

setupDatabase();