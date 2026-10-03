// Quick test script for payment API
// Run with: node test-payment.js

const API_BASE = 'http://localhost:3001';

async function testPaymentAPI() {
  console.log('🧪 Testing IJCAST Payment API...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing API Health...');
    const health = await fetch(`${API_BASE}/health`);
    const healthData = await health.json();
    console.log('✅ Health Check:', healthData.message);
    console.log('📊 Environment:', healthData.environment);

    // Test 2: Create Order
    console.log('\n2️⃣ Testing Payment Order Creation...');
    const orderPayload = {
      authorName: "Test Author",
      authorEmail: "test@example.com", 
      authorPhone: "+919876543210",
      manuscriptId: "TEST-001",
      authorType: "indian",
      gasfMembership: "",
      amount: 2000,
      currency: "INR"
    };

    const orderResponse = await fetch(`${API_BASE}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload)
    });

    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      console.log('✅ Order Created Successfully!');
      console.log('📋 Order ID:', orderData.data.orderId);
      console.log('💰 Amount:', orderData.data.orderAmount, orderData.data.orderCurrency);
      
      // Test 3: Verify Payment (will fail since no actual payment made)
      console.log('\n3️⃣ Testing Payment Verification...');
      const verifyResponse = await fetch(`${API_BASE}/api/payments/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: orderData.data.orderId })
      });

      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        console.log('✅ Verification API Working!');
        console.log('📊 Payment Status:', verifyData.data.paymentStatus);
      } else {
        const error = await verifyResponse.json();
        console.log('⚠️ Verification Response:', error.message);
      }

    } else {
      const error = await orderResponse.json();
      console.log('❌ Order Creation Failed:', error.message);
      
      if (error.message?.includes('Cashfree')) {
        console.log('\n💡 This is expected if you haven\'t configured Cashfree credentials yet.');
        console.log('📝 Update your Cashfree credentials in api/.env file.');
      }
    }

  } catch (error) {
    console.log('❌ API Connection Error:', error.message);
    console.log('\n💡 Make sure the backend server is running:');
    console.log('   cd api && npm start');
  }

  console.log('\n🎯 Next Steps:');
  console.log('1. Get Cashfree production credentials');
  console.log('2. Update api/.env with real credentials'); 
  console.log('3. Test payment flow on frontend');
  console.log('4. Deploy to production');
  
  console.log('\n📚 See PRODUCTION_SETUP_GUIDE.md for complete setup instructions.');
}

// Run the test
testPaymentAPI();