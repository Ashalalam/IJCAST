// Comprehensive Cashfree Diagnostic Test
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const appId = process.env.CASHFREE_APP_ID;
const secretKey = process.env.CASHFREE_SECRET_KEY;
const environment = process.env.CASHFREE_ENVIRONMENT;

console.log('🔧 CASHFREE COMPREHENSIVE DIAGNOSTIC TEST');
console.log('==========================================\n');

console.log('📋 Configuration Check:');
console.log('App ID:', appId);
console.log('Secret Key:', secretKey ? `${secretKey.substring(0, 20)}...` : 'NOT SET');
console.log('Environment:', environment);
console.log('');

// Get correct base URL
const baseUrl = environment === 'production' 
  ? 'https://api.cashfree.com/pg' 
  : 'https://sandbox.cashfree.com/pg';

console.log('🌐 API Base URL:', baseUrl);
console.log('');

async function runDiagnostics() {
  
  // Test 1: Credential Format Validation
  console.log('1️⃣ CREDENTIAL FORMAT VALIDATION');
  console.log('================================');
  
  let formatIssues = [];
  
  if (!appId) {
    formatIssues.push('❌ App ID is missing');
  } else if (!/^\d+$/.test(appId)) {
    formatIssues.push('❌ App ID should be numeric only');
  } else {
    console.log('✅ App ID format is correct');
  }
  
  if (!secretKey) {
    formatIssues.push('❌ Secret Key is missing');
  } else if (!secretKey.startsWith('cfsk_ma_')) {
    formatIssues.push('❌ Secret Key should start with "cfsk_ma_"');
  } else if (environment === 'production' && !secretKey.includes('_prod_')) {
    formatIssues.push('⚠️  Production environment but secret key doesn\'t contain "_prod_"');
  } else if (environment === 'sandbox' && !secretKey.includes('_test_')) {
    formatIssues.push('⚠️  Sandbox environment but secret key doesn\'t contain "_test_"');
  } else {
    console.log('✅ Secret Key format appears correct');
  }
  
  if (formatIssues.length > 0) {
    console.log('\n🚨 FORMAT ISSUES FOUND:');
    formatIssues.forEach(issue => console.log(issue));
  } else {
    console.log('✅ All credential formats are correct');
  }
  
  console.log('\n');
  
  // Test 2: Basic Authentication Test
  console.log('2️⃣ BASIC AUTHENTICATION TEST');
  console.log('=============================');
  
  try {
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'x-client-id': appId,
      'x-client-secret': secretKey,
      'x-api-version': '2023-08-01'
    };
    
    console.log('📡 Testing basic API access...');
    
    // Try a simple GET request that requires authentication
    const response = await axios.get(`${baseUrl}/merchants/me`, { 
      headers,
      timeout: 10000 
    });
    
    console.log('✅ Basic authentication successful!');
    console.log('📊 Status:', response.status);
    console.log('🏢 Merchant Data:', response.data ? 'Retrieved' : 'No data');
    
  } catch (error) {
    console.log('❌ Basic authentication failed!');
    console.log('📊 Status:', error.response?.status || 'No response');
    console.log('💬 Message:', error.response?.data?.message || error.message);
    console.log('🔍 Error Type:', error.response?.data?.type || 'Unknown');
    
    if (error.response?.status === 401) {
      console.log('\n🔧 AUTHENTICATION ERROR ANALYSIS:');
      console.log('- Your credentials are being rejected by Cashfree');
      console.log('- This could mean:');
      console.log('  1. App ID or Secret Key is incorrect');
      console.log('  2. Account is suspended or inactive');
      console.log('  3. Business verification is incomplete (for production)');
      console.log('  4. Credentials have been regenerated in dashboard');
      console.log('  5. Account has API access restrictions');
    }
  }
  
  console.log('\n');
  
  // Test 3: Order Creation Test
  console.log('3️⃣ ORDER CREATION TEST');
  console.log('=======================');
  
  try {
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'x-client-id': appId,
      'x-client-secret': secretKey,
      'x-api-version': '2023-08-01'
    };
    
    const testOrder = {
      order_id: `TEST_${Date.now()}`,
      order_amount: 100.00,
      order_currency: 'INR',
      customer_details: {
        customer_id: 'test_customer',
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_phone: '+919876543210'
      },
      order_note: 'Test order for authentication verification'
    };
    
    console.log('📡 Attempting to create test order...');
    
    const response = await axios.post(`${baseUrl}/orders`, testOrder, { 
      headers,
      timeout: 10000 
    });
    
    console.log('✅ Order creation successful!');
    console.log('📋 Order ID:', response.data.order_id);
    console.log('💰 Amount:', response.data.order_amount);
    console.log('🎉 Your Cashfree integration is working perfectly!');
    
  } catch (error) {
    console.log('❌ Order creation failed!');
    console.log('📊 Status:', error.response?.status || 'No response');
    console.log('💬 Message:', error.response?.data?.message || error.message);
    console.log('🔍 Error Type:', error.response?.data?.type || 'Unknown');
    console.log('📋 Full Response:', error.response?.data || 'No response data');
  }
  
  console.log('\n');
  
  // Test 4: Account Status Check
  console.log('4️⃣ RECOMMENDATIONS');
  console.log('==================');
  
  console.log('🎯 Next Steps:');
  console.log('1. Verify credentials in Cashfree dashboard');
  console.log('2. Check business verification status');
  console.log('3. Ensure account is active and not suspended');
  console.log('4. Try regenerating credentials');
  console.log('5. Contact Cashfree support if issues persist');
  
  console.log('\n📞 Cashfree Support:');
  console.log('Email: support@cashfree.com');
  console.log('Phone: +91-80-61779797');
  
  console.log('\n🔗 Dashboard: https://merchant.cashfree.com/');
}

runDiagnostics();