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
    console.log('🚀 Edge function called, method:', req.method)
    
    // Check environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const cashfreeAppId = Deno.env.get('CASHFREE_APP_ID')
    const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY')
    
    console.log('Environment check:')
    console.log('- SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
    console.log('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Set' : 'Missing')
    console.log('- CASHFREE_APP_ID:', cashfreeAppId ? 'Set' : 'Missing')
    console.log('- CASHFREE_SECRET_KEY:', cashfreeSecretKey ? 'Set' : 'Missing')

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing')
    }

    if (!cashfreeAppId || !cashfreeSecretKey) {
      throw new Error('Cashfree credentials not configured')
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Parse request body
    let requestBody
    try {
      requestBody = await req.json()
      console.log('Request body parsed successfully:', Object.keys(requestBody))
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { 
      authorName, 
      authorEmail, 
      authorPhone, 
      manuscriptId, 
      authorType, 
      gasfMembership,
      returnUrl
    } = requestBody

    console.log('Extracted fields:', {
      authorName: !!authorName,
      authorEmail: !!authorEmail, 
      authorPhone: !!authorPhone,
      manuscriptId: !!manuscriptId,
      authorType: !!authorType,
      returnUrl: !!returnUrl
    })

    // Validate required fields
    if (!authorName || !authorEmail || !authorPhone || !manuscriptId || !authorType || !returnUrl) {
      const missing = []
      if (!authorName) missing.push('authorName')
      if (!authorEmail) missing.push('authorEmail') 
      if (!authorPhone) missing.push('authorPhone')
      if (!manuscriptId) missing.push('manuscriptId')
      if (!authorType) missing.push('authorType')
      if (!returnUrl) missing.push('returnUrl')
      
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missing.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate return URL is HTTPS for production
    if (!returnUrl.startsWith('https://')) {
      return new Response(
        JSON.stringify({ 
          error: 'Return URL must use HTTPS for Cashfree production',
          received: returnUrl
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Server-side APC amount calculation (NEVER trust frontend)
    const calculateAPC = (authorType: string, isMember: boolean = false) => {
      const rates = {
        indian: {
          nonMember: 2000,
          member: 1200
        },
        foreign: {
          nonMember: 40, // USD
          member: 24     // USD
        }
      }

      const rate = rates[authorType as keyof typeof rates]
      if (!rate) {
        throw new Error(`Invalid author type: ${authorType}`)
      }

      const amount = isMember ? rate.member : rate.nonMember
      const currency = authorType === 'indian' ? 'INR' : 'USD'
      const discount = isMember ? 40 : 0

      return {
        amount,
        currency,
        originalAmount: rate.nonMember,
        discountPercent: discount,
        discountAmount: rate.nonMember - amount,
        isMember
      }
    }

    // Validate GASF membership (placeholder - implement actual validation)
    const isMember = Boolean(gasfMembership?.trim())
    const apcCalculation = calculateAPC(authorType, isMember)
    
    console.log('APC calculation:', apcCalculation)

    // Generate unique order ID
    const orderId = `IJCAST_${manuscriptId}_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`
    console.log('Generated order ID:', orderId)

    // Create Cashfree order FIRST (skip database for now to test)
    const cashfreeOrderPayload = {
      order_id: orderId,
      order_amount: apcCalculation.amount,
      order_currency: apcCalculation.currency,
      customer_details: {
        customer_id: `customer_${Date.now()}`,
        customer_name: authorName,
        customer_email: authorEmail,
        customer_phone: authorPhone
      },
      order_meta: {
        return_url: returnUrl,
        notify_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/cashfree-webhook`
      },
      order_note: `IJCAST APC Payment - Manuscript: ${manuscriptId}`
    }

    console.log('Creating Cashfree order...')
    const cashfreeResponse = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-client-id': cashfreeAppId,
        'x-client-secret': cashfreeSecretKey,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(cashfreeOrderPayload)
    })

    console.log('Cashfree response status:', cashfreeResponse.status)

    if (!cashfreeResponse.ok) {
      const errorData = await cashfreeResponse.text()
      console.error('Cashfree API error:', errorData)
      
      return new Response(
        JSON.stringify({ 
          error: 'Payment gateway error. Please try again.',
          details: errorData,
          status: cashfreeResponse.status
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const cashfreeOrder = await cashfreeResponse.json()
    console.log('✅ Cashfree order created:', cashfreeOrder.order_id)

    // Now try to create payment record in database
    console.log('Creating payment record in database...')
    try {
      const { data: paymentRecord, error: dbError } = await supabase
        .from('apc_payments')
        .insert([{
          order_id: orderId,
          author_name: authorName,
          author_email: authorEmail,
          author_phone: authorPhone,
          manuscript_id: manuscriptId,
          amount: apcCalculation.amount,
          currency: apcCalculation.currency,
          payment_status: 'PENDING',
          gasf_membership: gasfMembership || null,
          is_member: isMember,
          discount_applied: apcCalculation.discountPercent,
          cashfree_order_id: cashfreeOrder.order_id,
          metadata: {
            authorType,
            apcCalculation,
            cashfreeOrder,
            createdVia: 'edge-function'
          }
        }])
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        console.log('⚠️ Continuing without database record...')
      } else {
        console.log('✅ Payment record created:', paymentRecord.id)
      }
    } catch (dbError) {
      console.error('Database insertion failed:', dbError)
      console.log('⚠️ Continuing without database record...')
    }

    // Return success regardless of database status (payment gateway is working)
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          orderId,
          paymentSessionId: cashfreeOrder.payment_session_id,
          orderAmount: apcCalculation.amount,
          orderCurrency: apcCalculation.currency,
          apcCalculation,
          cashfreeOrderId: cashfreeOrder.order_id
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        stack: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})