import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent, SubscriptionData } from '@/lib/stripe';
import { addSubscription } from '@/lib/storage';

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
        
        // Extract subscription data from session
        const subscriptionData: SubscriptionData = {
          id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: session.metadata?.userId || 'unknown',
          amount_cents: session.amount_total || 0,
          currency: session.currency || 'inr',
          stripe_account_id: session.metadata?.stripe_account_id || 'unknown',
          sessionId: session.id,
          status: 'active',
          createdAt: new Date().toISOString(),
        };

        // Store subscription data
        addSubscription(subscriptionData);

        console.log('Subscription activated:', subscriptionData);

        return NextResponse.json({
          success: true,
          message: 'Subscription activated'
        });

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object;
        
        console.log('Payment failed:', {
          paymentIntentId: paymentIntent.id,
          failureReason: paymentIntent.last_payment_error?.message || 'Unknown failure',
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        });

        return NextResponse.json({
          success: false,
          error: 'Payment failed'
        });

      default:
        console.log(`Unhandled event type: ${event.type}`);
        return NextResponse.json({
          success: true,
          message: 'Event received but not processed'
        });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Webhook signature verification failed' 
      },
      { status: 400 }
    );
  }
} 