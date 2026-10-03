// Test Cashfree Authentication
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const appId = process.env.CASHFREE_APP_ID;
const secretKey = process.env.CASHFREE_SECRET_KEY;
const environment = process.env.CASHFREE_ENVIRONMENT;

console.log('🧪 Testing Cashfree Authentication...\n');

console.log('📋 Configuration:');
console.log('App ID:', appId);
console.log('Secret Key:', secretKey ? secretKey.substring(0, 20) + '...' : 'Not set');
console.log('Environment:', environment);
console.log('');

// Get the correct base URL
const baseUrl = environment === 'production' 
  ? 'https://api.cashfree.com/pg' 
  : 'https://sandbox.cashfree.com/pg';

console.log('🔗 API Base URL:', baseUrl);

async function testAuthentication() {
  try {
    // Test 1: Basic API health check
    console.log('\n1️⃣ Testing API health check...');
    
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'x-client-id': appId,
      'x-client-secret': secretKey,
      'x-api-version': '2023-08-01'
    };
    
    // Try to get eligible payment methods (this requires auth)
    const testUrl = `${baseUrl}/eligible/payment-methods`;
    
    console.log('📡 Making test request to:', testUrl);
    console.log('🔑 Headers:', {
      'x-client-id': appId,
      'x-client-secret': secretKey ? secretKey.substring(0, 10) + '...' : 'Not set',
      'x-api-version': '2023-08-01'
    });
    
    const response = await axios.get(testUrl, { headers });
    
    if (response.status === 200) {
      console.log('✅ Authentication successful!');
      console.log('📊 API Response:', response.status, response.statusText);
      console.log('🎉 Your Cashfree credentials are working!');
    }
    
  } catch (error) {
    console.log('❌ Authentication failed!');
    console.log('📊 Status:', error.response?.status);
    console.log('💬 Message:', error.response?.data?.message || error.message);
    console.log('🔍 Error Type:', error.response?.data?.type);
    console.log('📋 Full Response:', error.response?.data);
    
    if (error.response?.status === 401) {
      console.log('\n🔧 Possible Solutions:');
      console.log('1. ❓ Are you using the correct App ID and Secret Key?');
      console.log('2. 🔄 Try switching environment (sandbox vs production)');
      console.log('3. 📅 Check if credentials are expired or suspended');
      console.log('4. 🏢 Verify business verification status in Cashfree dashboard');
      console.log('5. 🔑 Regenerate credentials in Cashfree dashboard');
      
      console.log('\n🧪 Quick Test: Try sandbox environment');
      console.log('Update .env file:');
      console.log('CASHFREE_ENVIRONMENT=sandbox');
      console.log('VITE_CASHFREE_ENVIRONMENT=sandbox');
    }
  }
}

// Test 2: Validate credential format
console.log('\n2️⃣ Validating credential format...');

if (!appId) {
  console.log('❌ CASHFREE_APP_ID is missing');
} else if (!/^\d+$/.test(appId)) {
  console.log('❌ App ID should be numeric, got:', appId);
} else {
  console.log('✅ App ID format looks correct');
}

if (!secretKey) {
  console.log('❌ CASHFREE_SECRET_KEY is missing');
} else if (!secretKey.startsWith('cfsk_ma_')) {
  console.log('❌ Secret Key should start with "cfsk_ma_", got:', secretKey.substring(0, 10) + '...');
} else {
  console.log('✅ Secret Key format looks correct');
}

// Test 3: Check environment matching
if (environment === 'production' && secretKey?.includes('_test_')) {
  console.log('⚠️  Environment mismatch: Production environment with test credentials');
  console.log('💡 Try: CASHFREE_ENVIRONMENT=sandbox');
} else if (environment === 'sandbox' && secretKey?.includes('_prod_')) {
  console.log('⚠️  Environment mismatch: Sandbox environment with production credentials');
  console.log('💡 Try: CASHFREE_ENVIRONMENT=production');
} else {
  console.log('✅ Environment and credentials appear to match');
}

// Run the authentication test
testAuthentication();