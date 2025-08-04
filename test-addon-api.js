// Test file for Module B: Add-On Purchase – Blessing PDF API routes

const BASE_URL = 'http://localhost:3000/api';

// Test 1: Create Add-on Session
async function testCreateAddonSession() {
  console.log('\n=== Testing POST /api/create-addon-session ===');
  
  const payload = {
    userId: "USER_002",
    amount_cents: 199, // ₹1.99 in cents
    currency: "INR",
    stripe_account_id: "acct_guru_123"
  };

  try {
    const response = await fetch(`${BASE_URL}/create-addon-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Add-on session created successfully');
      console.log('Session ID:', result.sessionId);
      console.log('Expected Session ID: cs_test_addon_789');
      console.log('Amount: ₹1.99 (199 cents)');
      console.log('Application Fee: ₹0.40 (80 cents - 20%)');
      console.log('Vendor Payout: ₹1.59 (159 cents - 80%)');
    } else {
      console.log('❌ Failed to create add-on session:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Test 2: Get Add-on Purchase Status
async function testAddonPurchaseStatus() {
  console.log('\n=== Testing GET /api/addon-purchase-status ===');
  
  const vendorId = "acct_guru_123";

  try {
    const response = await fetch(`${BASE_URL}/addon-purchase-status?vendorId=${vendorId}`, {
      method: 'GET',
    });

    const result = await response.json();
    console.log('Response:', result);
    
    if (result.totalAddOnSales !== undefined) {
      console.log('✅ Add-on sales status retrieved successfully');
      console.log('Total Add-On Sales:', result.totalAddOnSales);
      console.log('Total Add-On Revenue (cents):', result.totalAddOnRevenueCents);
      console.log('Total Add-On Commission (cents):', result.totalAddOnCommissionCents);
      console.log('Expected: 25 sales, ₹4,975 revenue, ₹995 commission');
    } else {
      console.log('❌ Failed to get add-on sales status:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Test 3: Simulate Webhook (for testing purposes)
async function testAddonWebhook() {
  console.log('\n=== Testing POST /api/addon-webhook ===');
  
  // This is a mock webhook payload for checkout.session.completed
  const mockWebhookPayload = {
    id: 'evt_test_webhook',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_addon_789',
        metadata: {
          type: 'addon_purchase',
          userId: 'USER_002',
          stripe_account_id: 'acct_guru_123'
        },
        payment_status: 'paid',
        amount_total: 199
      }
    }
  };

  try {
    const response = await fetch(`${BASE_URL}/addon-webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'mock_signature_for_testing'
      },
      body: JSON.stringify(mockWebhookPayload),
    });

    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Webhook processed successfully');
      console.log('Message:', result.message);
      console.log('Expected: "Blessing PDF purchased"');
    } else {
      console.log('❌ Failed to process webhook:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Module B: Add-On Purchase API Tests\n');
  console.log('💰 Testing ₹1.99 add-on purchase with 80/20 split\n');
  
  await testCreateAddonSession();
  await testAddonPurchaseStatus();
  await testAddonWebhook();
  
  console.log('\n✅ All tests completed!');
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runAllTests().catch(console.error);
}

module.exports = {
  testCreateAddonSession,
  testAddonPurchaseStatus,
  testAddonWebhook,
  runAllTests
}; 