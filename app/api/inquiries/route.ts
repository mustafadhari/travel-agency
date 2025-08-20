import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Inquiry API called')
    const body = await request.json()
    console.log('Request body:', body)
    
    // Validate required fields
    const { name, phone } = body
    
    if (!name || !phone) {
      console.log('Validation failed: missing name or phone')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare the data for n8n webhook
    const n8nPayload = {
      name,
      phone,
      destination: body.destination || '',
      travelDate: body.travelDate || '',
      duration: body.duration || '',
      travelers: body.travelers || {},
      submittedAt: body.submittedAt || new Date().toISOString(),
      source: body.source || 'Website Inquiry'
    }

    // Check if n8n webhook URL is configured
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    
    if (n8nWebhookUrl) {
      // Send to n8n webhook if URL is configured
      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(n8nPayload),
        })

        if (!n8nResponse.ok) {
          console.error('N8N webhook failed:', await n8nResponse.text())
          return NextResponse.json(
            { error: 'Failed to process inquiry' },
            { status: 500 }
          )
        }
      } catch (webhookError) {
        console.error('Error calling n8n webhook:', webhookError)
        // Continue with success response even if webhook fails
      }
    } else {
      // Log the inquiry data for development/testing
      console.log('Inquiry received (n8n webhook not configured):', n8nPayload)
    }

    console.log('Inquiry processed successfully')
    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully',
        data: n8nPayload
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing inquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
