import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get Cashfree credentials
    const cashfreeAppId = Deno.env.get('CASHFREE_APP_ID')!
    const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY')!

    // Parse request body
    const { orderId } = await req.json()

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: 'Order ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get payment record from Supabase
    const { data: paymentRecord, error: dbError } = await supabase
      .from('apc_payments')
      .select('*')
      .eq('order_id', orderId)
      .single()

    if (dbError || !paymentRecord) {
      return new Response(
        JSON.stringify({ error: 'Payment record not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch latest order status from Cashfree
    const cashfreeResponse = await fetch(
      `https://api.cashfree.com/pg/orders/${paymentRecord.cashfree_order_id}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-client-id': cashfreeAppId,
          'x-client-secret': cashfreeSecretKey,
          'x-api-version': '2023-08-01'
        }
      }
    )

    if (!cashfreeResponse.ok) {
      console.error('Failed to fetch Cashfree order status')
      return new Response(
        JSON.stringify({ 
          error: 'Failed to verify payment status',
          data: {
            orderId,
            paymentStatus: paymentRecord.payment_status,
            lastKnownStatus: paymentRecord.payment_status
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const cashfreeOrder = await cashfreeResponse.json()

    // Fetch payment details if order is paid
    let paymentDetails = null
    if (cashfreeOrder.order_status === 'PAID') {
      const paymentsResponse = await fetch(
        `https://api.cashfree.com/pg/orders/${paymentRecord.cashfree_order_id}/payments`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'x-client-id': cashfreeAppId,
            'x-client-secret': cashfreeSecretKey,
            'x-api-version': '2023-08-01'
          }
        }
      )

      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json()
        paymentDetails = paymentsData?.data?.[0] || null
      }
    }

    // Map Cashfree status to our internal status
    let internalStatus = paymentRecord.payment_status
    switch (cashfreeOrder.order_status) {
      case 'PAID':
        internalStatus = 'PAID'
        break
      case 'ACTIVE':
        internalStatus = 'PENDING'
        break
      case 'EXPIRED':
        internalStatus = 'CANCELLED'
        break
      case 'CANCELLED':
        internalStatus = 'CANCELLED'
        break
      case 'TERMINATED':
        internalStatus = 'FAILED'
        break
      default:
        internalStatus = 'PENDING'
    }

    // Update payment record if status changed
    if (internalStatus !== paymentRecord.payment_status) {
      const updateData = {
        payment_status: internalStatus,
        payment_method: paymentDetails?.payment_method || paymentRecord.payment_method,
        cashfree_payment_id: paymentDetails?.cf_payment_id || paymentRecord.cashfree_payment_id,
        metadata: {
          ...paymentRecord.metadata,
          cashfreeOrder,
          paymentDetails,
          verifiedAt: new Date().toISOString()
        }
      }

      if (internalStatus === 'PAID') {
        updateData.updated_at = new Date().toISOString()
      }

      await supabase
        .from('apc_payments')
        .update(updateData)
        .eq('order_id', orderId)
    }

    // Return verification result
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          orderId,
          paymentStatus: internalStatus,
          orderAmount: paymentRecord.amount,
          orderCurrency: paymentRecord.currency,
          authorName: paymentRecord.author_name,
          manuscriptId: paymentRecord.manuscript_id,
          paymentMethod: paymentDetails?.payment_method || paymentRecord.payment_method,
          transactionId: paymentDetails?.cf_payment_id || paymentRecord.cashfree_payment_id,
          paymentTime: paymentDetails?.payment_time || null,
          cashfreeOrderStatus: cashfreeOrder.order_status,
          verifiedAt: new Date().toISOString()
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Payment verification error:', error)
    return new Response(
      JSON.stringify({ error: 'Payment verification failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})