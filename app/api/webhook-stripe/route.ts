import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { addSubscription } from '@/lib/storage';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { success: false, error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = constructWebhookEvent(body, signature);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Check if this is a subscription (not an add-on)
        if (!session.metadata?.type || session.metadata.type !== 'addon_purchase') {
          // Store subscription data
          const subscriptionData = {
            id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId: session.metadata?.userId || 'unknown',
            amount_cents: session.amount_total || 0,
            currency: session.currency || 'usd',
            stripe_account_id: session.metadata?.stripe_account_id || 'unknown',
            sessionId: session.id,
            status: 'active' as const,
            createdAt: new Date().toISOString(),
          };

          addSubscription(subscriptionData);
          console.log(`Subscription completed: ${session.id}`);
        }
        break;

      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 