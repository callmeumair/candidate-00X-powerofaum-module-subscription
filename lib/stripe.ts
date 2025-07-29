import Stripe from 'stripe';

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Types for our API
export interface CreateSubscriptionSessionRequest {
  userId: string;
  amount_cents: number;
  currency: string;
  stripe_account_id: string;
}

export interface SubscriptionData {
  id: string;
  userId: string;
  amount_cents: number;
  currency: string;
  stripe_account_id: string;
  sessionId: string;
  status: 'active' | 'cancelled' | 'failed';
  createdAt: string;
}

export interface VendorSalesStatus {
  totalSubscriptions: number;
  totalRevenueCents: number;
  totalCommissionCents: number;
}

// Helper function to create checkout session with Connect split
export async function createCheckoutSession(data: CreateSubscriptionSessionRequest) {
  const platformAccountId = process.env.STRIPE_PLATFORM_ACCOUNT_ID;
  
  if (!platformAccountId) {
    throw new Error('STRIPE_PLATFORM_ACCOUNT_ID not configured');
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: data.currency.toLowerCase(),
          product_data: {
            name: 'PowerOfAum Subscription',
            description: `Subscription for user ${data.userId}`,
          },
          unit_amount: data.amount_cents,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
    metadata: {
      userId: data.userId,
      stripe_account_id: data.stripe_account_id,
    },
  }, {
    stripeAccount: platformAccountId,
  });

  return session;
}

// Helper function to verify webhook signature
export function constructWebhookEvent(payload: string | Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET not configured');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
} 