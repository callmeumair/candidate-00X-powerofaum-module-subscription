# PowerOfAum API

A minimal Next.js 14 API backend for the PowerOfAum SaaS module with Stripe integration and Connect split payments.

## Features

- **Stripe Integration**: Full Stripe Checkout and Connect integration
- **Webhook Handling**: Secure webhook processing with signature verification
- **Connect Split**: 80% to vendor, 20% to platform
- **TypeScript**: Fully typed API endpoints
- **Vercel Ready**: Deploy-ready configuration

## API Endpoints

### 1. Create Subscription Session
```
POST /api/create-subscription-session
```

**Request Body:**
```json
{
  "userId": "USER_001",
  "amount_cents": 300000,
  "currency": "INR",
  "stripe_account_id": "acct_guru_123"
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "cs_test_subscription_ABC"
}
```

### 2. Stripe Webhook
```
POST /api/webhook-stripe
```

Handles `checkout.session.completed` and `payment_intent.payment_failed` events.

### 3. Vendor Sales Status
```
GET /api/vendor-sales-status?vendorId=VENDOR_001
```

**Response:**
```json
{
  "totalSubscriptions": 100,
  "totalRevenueCents": 30000000,
  "totalCommissionCents": 6000000
}
```

### 4. Health Check
```
GET /api/health
```

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `env.example` to `.env.local` and fill in your Stripe credentials:

```bash
cp env.example .env.local
```

Required environment variables:
- `STRIPE_SECRET_KEY`: Your Stripe secret key (test mode)
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (test mode)
- `STRIPE_WEBHOOK_SECRET`: Webhook endpoint secret from Stripe
- `STRIPE_PLATFORM_ACCOUNT_ID`: Your platform Stripe Connect account ID
- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET`: Random secret for NextAuth

### 3. Stripe Setup

1. Create a Stripe account and get your test API keys
2. Set up Stripe Connect for split payments
3. Create a webhook endpoint in Stripe dashboard pointing to `/api/webhook-stripe`
4. Get the webhook secret from Stripe

### 4. Development
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### 5. Production Deployment

#### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

#### Other Platforms
The app is compatible with any Node.js hosting platform that supports Next.js.

## Project Structure

```
PowerOfAum/
├── app/
│   ├── api/
│   │   ├── create-subscription-session/
│   │   │   └── route.ts
│   │   ├── webhook-stripe/
│   │   │   └── route.ts
│   │   ├── vendor-sales-status/
│   │   │   └── route.ts
│   │   └── health/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── stripe.ts
│   └── storage.ts
├── data/
│   └── subscriptions.json (auto-generated)
├── package.json
├── next.config.js
├── tsconfig.json
├── .gitignore
├── env.example
└── README.md
```

## Testing

### Test the API Endpoints

1. **Health Check:**
```bash
curl http://localhost:3000/api/health
```

2. **Create Subscription Session:**
```bash
curl -X POST http://localhost:3000/api/create-subscription-session \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_001",
    "amount_cents": 300000,
    "currency": "INR",
    "stripe_account_id": "acct_guru_123"
  }'
```

3. **Get Vendor Sales Status:**
```bash
curl "http://localhost:3000/api/vendor-sales-status?vendorId=VENDOR_001"
```

### Test Stripe Webhooks

Use Stripe CLI to forward webhooks to your local development server:

```bash
stripe listen --forward-to localhost:3000/api/webhook-stripe
```

## Security Considerations

- All Stripe webhooks are verified using signature verification
- Environment variables are used for sensitive configuration
- CORS headers are configured for API endpoints
- Input validation is implemented for all endpoints

## Dependencies

- **Next.js 14**: React framework with App Router
- **Stripe**: Payment processing and Connect integration
- **TypeScript**: Type safety and better developer experience

## License

MIT License 