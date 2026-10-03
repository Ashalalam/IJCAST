import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cf-signature, x-cf-timestamp',
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

    // Get Cashfree secret key for webhook verification
    const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY')!

    // Get webhook signature and timestamp from headers
    const signature = req.headers.get('x-cf-signature')
    const timestamp = req.headers.get('x-cf-timestamp')

    if (!signature || !timestamp) {
      console.error('Missing webhook signature or timestamp')
      return new Response('Missing signature or timestamp', { status: 400 })
    }

    // Parse webhook payload
    const webhookBody = await req.text()
    const webhookData = JSON.parse(webhookBody)

    // Verify webhook signature
    const encoder = new TextEncoder()
    const keyData = encoder.encode(cashfreeSecretKey)
    const dataToSign = encoder.encode(`${timestamp}${webhookBody}`)
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, dataToSign)
    const computedSignature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)))
    
    const isSignatureValid = computedSignature === signature

    if (!isSignatureValid) {
      console.error('Invalid webhook signature')
      return new Response('Invalid signature', { status: 401 })
    }

    // Extract order information from webhook
    const { order, payment } = webhookData.data || {}
    
    if (!order?.order_id) {
      console.error('Invalid webhook data - missing order ID')
      return new Response('Invalid webhook data', { status: 400 })
    }

    const cashfreeOrderId = order.order_id

    // Find corresponding payment record in Supabase
    const { data: paymentRecord, error: findError } = await supabase
      .from('apc_payments')
      .select('*')
      .eq('cashfree_order_id', cashfreeOrderId)
      .single()

    if (findError || !paymentRecord) {
      console.error('Payment record not found:', cashfreeOrderId)
      return new Response('Payment record not found', { status: 404 })
    }

    // Determine payment status based on webhook event
    let paymentStatus = 'PENDING'
    let paidAt = null
    
    switch (webhookData.type) {
      case 'PAYMENT_SUCCESS_WEBHOOK':
        paymentStatus = 'PAID'
        paidAt = new Date().toISOString()
        break
      case 'PAYMENT_FAILED_WEBHOOK':
        paymentStatus = 'FAILED'
        break
      case 'PAYMENT_USER_DROPPED_WEBHOOK':
        paymentStatus = 'CANCELLED'
        break
      default:
        console.log('Unhandled webhook type:', webhookData.type)
        paymentStatus = 'PENDING'
    }

    // Check for duplicate processing (idempotency)
    const existingMetadata = paymentRecord.metadata || {}
    const webhookId = `${webhookData.type}_${timestamp}`
    
    if (existingMetadata.processedWebhooks && existingMetadata.processedWebhooks.includes(webhookId)) {
      console.log('Webhook already processed:', webhookId)
      return new Response('Webhook already processed', { status: 200 })
    }

    // Update payment record with webhook information
    const updateData = {
      payment_status: paymentStatus,
      cashfree_payment_id: payment?.cf_payment_id || paymentRecord.cashfree_payment_id,
      payment_method: payment?.payment_method || paymentRecord.payment_method,
      metadata: {
        ...existingMetadata,
        webhookData,
        processedWebhooks: [...(existingMetadata.processedWebhooks || []), webhookId],
        lastWebhookAt: new Date().toISOString()
      }
    }

    if (paidAt) {
      updateData.updated_at = paidAt
    }

    const { error: updateError } = await supabase
      .from('apc_payments')
      .update(updateData)
      .eq('cashfree_order_id', cashfreeOrderId)

    if (updateError) {
      console.error('Failed to update payment record:', updateError)
      return new Response('Database update failed', { status: 500 })
    }

    // Log successful processing
    console.log(`Webhook processed successfully: ${webhookData.type} for order ${cashfreeOrderId}`)

    // TODO: Add additional business logic here
    // - Send confirmation email to customer
    // - Notify editors about successful APC payment
    // - Update manuscript status
    // - Generate receipt
    
    if (paymentStatus === 'PAID') {
      console.log(`Payment successful for manuscript ${paymentRecord.manuscript_id} by ${paymentRecord.author_email}`)
      
      // Here you can add:
      // - Email notification service
      // - Manuscript processing workflow
      // - Receipt generation
      // - Admin notifications
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Webhook processed successfully',
        orderId: paymentRecord.order_id,
        status: paymentStatus
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})