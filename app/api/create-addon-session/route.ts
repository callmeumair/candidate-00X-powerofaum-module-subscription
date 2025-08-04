import { NextRequest, NextResponse } from 'next/server';
import { createAddonCheckoutSession, CreateAddonSessionRequest } from '@/lib/stripe';
import { addAddon } from '@/lib/storage';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body: CreateAddonSessionRequest = await request.json();
    
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

    // Create mock Stripe checkout session for add-on
    const session = await createAddonCheckoutSession(body);

    // Store add-on purchase data
    const addonData = {
      id: `addon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: body.userId,
      amount_cents: body.amount_cents,
      currency: body.currency,
      stripe_account_id: body.stripe_account_id,
      sessionId: session.id,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    addAddon(addonData);

    // Return mock response as specified
    return NextResponse.json({
      success: true,
      sessionId: "cs_test_addon_789"
    });

  } catch (error) {
    console.error('Error creating add-on session:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 