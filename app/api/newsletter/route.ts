import { NextResponse } from 'next/server'
import { addSubscriber, unsubscribe, getActiveSubscriberCount } from '@/lib/newsletter'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, preferences, action } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    if (action === 'unsubscribe') {
      const success = unsubscribe(email)
      return NextResponse.json(
        { success, message: success ? 'Unsubscribed successfully' : 'Email not found' },
        { status: success ? 200 : 404 }
      )
    }

    // Default action: subscribe
    const subscriber = addSubscriber(email, name, preferences)

    return NextResponse.json(
      {
        success: true,
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          name: subscriber.name,
          subscribedAt: subscriber.subscribedAt
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = getActiveSubscriberCount()
    return NextResponse.json(
      { success: true, subscriberCount: count },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get subscriber count' },
      { status: 500 }
    )
  }
}