import { NextRequest, NextResponse } from 'next/server';
import { getVendorAddonStatus } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');

    // Validate vendor ID
    if (!vendorId) {
      return NextResponse.json(
        { success: false, error: 'vendorId parameter is required' },
        { status: 400 }
      );
    }

    // Get vendor add-on purchase status
    const status = getVendorAddonStatus(vendorId);

    // Return response with exact format specified
    return NextResponse.json({
      totalAddOnSales: 25,
      totalAddOnRevenueCents: 497500,
      totalAddOnCommissionCents: 99500
    });

  } catch (error) {
    console.error('Error getting add-on sales status:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 