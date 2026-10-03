import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Cashfree credentials from environment
    const cashfreeAppId = Deno.env.get('CASHFREE_APP_ID')
    const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY')
    
    console.log('🔍 CASHFREE AUTHENTICATION DIAGNOSTIC')
    console.log('=====================================')
    console.log('App ID:', cashfreeAppId)
    console.log('Secret Key length:', cashfreeSecretKey?.length || 'Not set')
    console.log('Secret Key prefix:', cashfreeSecretKey?.substring(0, 15) + '...' || 'Not set')
    
    if (!cashfreeAppId || !cashfreeSecretKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Credentials missing',
          appId: !!cashfreeAppId,
          secretKey: !!cashfreeSecretKey
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Test: Try creating a test order (this is the main endpoint we need)
    console.log('📡 Testing order creation API...')
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
      order_note: 'Authentication test order'
    }

    const orderResponse = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-client-id': cashfreeAppId,
        'x-client-secret': cashfreeSecretKey,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(testOrder)
    })

    const orderResult = await orderResponse.text()
    console.log('Order API status:', orderResponse.status)
    console.log('Order API result:', orderResult)

    if (orderResponse.ok) {
      const orderData = JSON.parse(orderResult)
      console.log('✅ Order creation successful')
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Authentication successful - Order created',
          orderData,
          credentials: {
            appIdLength: cashfreeAppId.length,
            secretKeyLength: cashfreeSecretKey.length,
            appIdType: /^\d+$/.test(cashfreeAppId) ? 'numeric' : 'alphanumeric'
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      // Authentication failed - provide diagnostic info
      return new Response(
        JSON.stringify({
          error: 'Authentication failed',
          orderApiStatus: orderResponse.status,
          orderApiError: orderResult,
          credentials: {
            appId: cashfreeAppId,
            appIdLength: cashfreeAppId.length,
            secretKeyLength: cashfreeSecretKey.length,
            appIdType: /^\d+$/.test(cashfreeAppId) ? 'numeric' : 'alphanumeric',
            secretKeyPrefix: cashfreeSecretKey.substring(0, 20) + '...',
          },
          suggestions: [
            "Check if the App ID format is correct in Cashfree dashboard",
            "Verify the secret key matches the App ID", 
            "Ensure your Cashfree account is active and verified",
            "Check if you're using production vs sandbox credentials correctly",
            "Try regenerating your API keys in Cashfree dashboard"
          ]
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('Diagnostic error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})