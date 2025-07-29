import { NextRequest, NextResponse } from 'next/server';
import { getVendorSalesStatus } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');

    if (!vendorId) {
      return NextResponse.json(
        { success: false, error: 'vendorId parameter is required' },
        { status: 400 }
      );
    }

    // For now, return static mock response as specified
    // In production, you would use: getVendorSalesStatus(vendorId)
    const mockResponse = {
      totalSubscriptions: 100,
      totalRevenueCents: 30000000,
      totalCommissionCents: 6000000
    };

    return NextResponse.json(mockResponse);

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