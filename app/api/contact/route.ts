import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, inquiryType, message } = body

    // Validate required fields
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim() || !inquiryType || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Prepare the payload for n8n webhook
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      inquiryType,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      source: "Contact Page Enquiry Form",
      page: "Contact"
    }

    // Send to n8n webhook if configured
    if (process.env.N8N_CONTACT_WEBHOOK_URL) {
      const webhookResponse = await fetch(process.env.N8N_CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!webhookResponse.ok) {
        console.error('Failed to send to n8n webhook:', webhookResponse.statusText)
        // Still return success to user, but log the error
      }
    } else {
      // Log to console if webhook not configured
      console.log('Contact enquiry received (no webhook configured):', payload)
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your enquiry! We will get back to you soon.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing contact enquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}
