import { NextRequest, NextResponse } from 'next/server';
import { getVendorSalesStatus } from '@/lib/storage';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

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

    // Get vendor sales status
    const status = getVendorSalesStatus(vendorId);

    // Return success response
    return NextResponse.json(status);

  } catch (error) {
    console.error('Error getting vendor sales status:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 