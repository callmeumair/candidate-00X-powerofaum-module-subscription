const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing PowerOfAum API...\n');

  // Test 1: Health Check
  console.log('1. Testing Health Check...');
  try {
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
  } catch (error) {
    console.log('❌ Health Check failed:', error.message);
  }

  // Test 2: Create Subscription Session
  console.log('\n2. Testing Create Subscription Session...');
  try {
    const subscriptionResponse = await fetch(`${BASE_URL}/api/create-subscription-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'USER_001',
        amount_cents: 300000,
        currency: 'INR',
        stripe_account_id: 'acct_guru_123'
      })
    });
    const subscriptionData = await subscriptionResponse.json();
    console.log('✅ Create Subscription Session:', subscriptionData);
  } catch (error) {
    console.log('❌ Create Subscription Session failed:', error.message);
  }

  // Test 3: Vendor Sales Status
  console.log('\n3. Testing Vendor Sales Status...');
  try {
    const salesResponse = await fetch(`${BASE_URL}/api/vendor-sales-status?vendorId=VENDOR_001`);
    const salesData = await salesResponse.json();
    console.log('✅ Vendor Sales Status:', salesData);
  } catch (error) {
    console.log('❌ Vendor Sales Status failed:', error.message);
  }

  console.log('\n🎉 API testing completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI().catch(console.error);
}

module.exports = { testAPI }; 