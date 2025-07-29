import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, CreateSubscriptionSessionRequest } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body: CreateSubscriptionSessionRequest = await request.json();
    
    // Validate required fields
    if (!body.userId || !body.amount_cents || !body.currency || !body.stripe_account_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate amount
    if (body.amount_cents <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession(body);

    // Return mock response as specified
    return NextResponse.json({
      success: true,
      sessionId: session.id || 'cs_test_subscription_ABC'
    });

  } catch (error) {
    console.error('Error creating subscription session:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 