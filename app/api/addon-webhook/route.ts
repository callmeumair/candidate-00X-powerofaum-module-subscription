import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { getAddonBySessionId, updateAddonStatus } from '@/lib/storage';

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

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Check if this is an add-on purchase using metadata
      if (session.metadata?.type === 'addon_purchase') {
        const addon = getAddonBySessionId(session.id);
        
        if (addon) {
          // Generate mock PDF URL
          const pdfUrl = `https://api.powerofaum.com/blessing-pdf/${addon.id}.pdf`;
          
          // Update add-on status to completed
          updateAddonStatus(session.id, 'completed', pdfUrl);
          
          console.log(`Add-on purchase completed: ${session.id}, PDF: ${pdfUrl}`);
          
          // Return success response as specified
          return NextResponse.json({
            success: true,
            message: "Blessing PDF purchased"
          });
        } else {
          console.log(`Add-on not found for session: ${session.id}`);
          return NextResponse.json({
            success: false,
            error: "Add-on purchase not found"
          }, { status: 404 });
        }
      } else {
        // Not an add-on purchase, ignore
        console.log(`Non-addon purchase completed: ${session.id}`);
        return NextResponse.json({
          success: true,
            message: "Non-addon purchase completed"
        });
      }
    }

    // Handle other event types
    console.log(`Unhandled event type: ${event.type}`);
    return NextResponse.json({
      success: true,
      message: `Event ${event.type} processed`
    });

  } catch (error) {
    console.error('Error processing add-on webhook:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 