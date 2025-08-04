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

// Add-on Purchase Types
export interface CreateAddonSessionRequest {
  userId: string;
  amount_cents: number;
  currency: string;
  stripe_account_id: string;
}

export interface AddonData {
  id: string;
  userId: string;
  amount_cents: number;
  currency: string;
  stripe_account_id: string;
  sessionId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  pdfUrl?: string;
}

export interface AddonPurchaseStatus {
  totalAddons: number;
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

// Helper function to create add-on checkout session (one-time payment)
export async function createAddonCheckoutSession(data: CreateAddonSessionRequest) {
  // Calculate application fee (20% of the total amount)
  const applicationFeeAmount = Math.floor(data.amount_cents * 0.2);
  
  // Mock session creation - no real Stripe API call
  const mockSession = {
    id: 'cs_test_addon_789',
    url: `https://checkout.stripe.com/pay/cs_test_addon_789`,
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: data.currency.toLowerCase(),
          product_data: {
            name: 'Blessing PDF Add-On',
            description: `Blessing PDF purchase for user ${data.userId}`,
          },
          unit_amount: data.amount_cents,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/addon-success?session_id=cs_test_addon_789`,
    cancel_url: `${process.env.NEXTAUTH_URL}/addon-cancel`,
    metadata: {
      userId: data.userId,
      stripe_account_id: data.stripe_account_id,
      type: 'addon_purchase',
    },
    // Stripe Connect specific fields
    stripeAccount: data.stripe_account_id,
    applicationFeeAmount: applicationFeeAmount,
  };

  return mockSession;
} 