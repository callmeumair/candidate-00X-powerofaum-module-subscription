export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>PowerOfAum API</h1>
      <p>Welcome to the PowerOfAum SaaS API backend.</p>
      
      <h2>Available Endpoints:</h2>
      <ul>
        <li><strong>POST /api/create-subscription-session</strong> - Create Stripe checkout session</li>
        <li><strong>POST /api/webhook-stripe</strong> - Handle Stripe webhooks</li>
        <li><strong>GET /api/vendor-sales-status?vendorId=VENDOR_001</strong> - Get vendor sales status</li>
      </ul>
      
      <h2>Environment Variables Required:</h2>
      <ul>
        <li>STRIPE_SECRET_KEY</li>
        <li>STRIPE_PUBLISHABLE_KEY</li>
        <li>STRIPE_WEBHOOK_SECRET</li>
        <li>STRIPE_PLATFORM_ACCOUNT_ID</li>
        <li>NEXTAUTH_URL</li>
        <li>NEXTAUTH_SECRET</li>
      </ul>
      
      <p>Copy <code>env.example</code> to <code>.env.local</code> and fill in your Stripe credentials.</p>
    </div>
  )
} 