# PowerOfAum API

A minimal Next.js 14 API backend for the PowerOfAum SaaS module with Stripe integration and Connect split payments.

## Features

- **Stripe Integration**: Full Stripe Checkout and Connect integration
- **Webhook Handling**: Secure webhook processing with signature verification
- **Connect Split**: 80% to vendor, 20% to platform
- **TypeScript**: Fully typed API endpoints
- **Vercel Ready**: Deploy-ready configuration
- **Module B: Add-On Purchase**: Blessing PDF purchase functionality

## API Endpoints

### Module A: Subscription Management

#### 1. Create Subscription Session
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

#### 2. Stripe Webhook
```
POST /api/webhook-stripe
```

Handles `checkout.session.completed` and `payment_intent.payment_failed` events.

#### 3. Vendor Sales Status
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

### Module B: Add-On Purchase – Blessing PDF

#### 1. Create Add-on Session
```
POST /api/create-addon-session
```

**Request Body:**
```json
{
  "userId": "USER_002",
  "amount_cents": 199,
  "currency": "INR",
  "stripe_account_id": "acct_guru_123"
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "cs_test_addon_789"
}
```

**Features:**
- Uses Stripe Connect with 80% payout to vendor
- Sets application_fee_amount to 20% of amount_cents
- Mock session creation (no real Stripe API calls)
- Example: ₹1.99 payment → ₹1.59 to vendor, ₹0.40 platform fee

#### 2. Add-on Sales Status
```
GET /api/addon-purchase-status?vendorId=acct_guru_123
```

**Response:**
```json
{
  "totalAddOnSales": 25,
  "totalAddOnRevenueCents": 497500,
  "totalAddOnCommissionCents": 99500
}
```

**Features:**
- Returns dummy/mock data for testing
- Shows total add-on sales count
- Displays total revenue in cents
- Shows platform commission (20% of revenue)
- Example: 25 sales × ₹19.90 = ₹497.50 revenue, ₹99.50 commission

#### 3. Add-on Webhook
```
POST /api/addon-webhook
```

Handles Stripe webhooks for add-on purchases and generates PDF URLs upon successful payment.

**Webhook Events:**
- `checkout.session.completed`: Processes completed add-on purchases

**Response for Add-on Purchase:**
```json
{
  "success": true,
  "message": "Blessing PDF purchased"
}
```

**Features:**
- Verifies webhook signatures for security
- Checks metadata.type === 'addon_purchase' to identify add-ons
- Saves purchase info to addOns.json file
- Generates PDF URLs upon successful payment
- Updates add-on status from pending to completed

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
│   │   ├── create-addon-session/
│   │   │   └── route.ts
│   │   ├── addon-purchase-status/
│   │   │   └── route.ts
│   │   ├── addon-webhook/
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
│   ├── subscriptions.json (auto-generated)
│   └── addons.json (auto-generated)
├── package.json
├── next.config.js
├── tsconfig.json
├── test-api.js
├── test-addon-api.js
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

4. **Create Add-on Session:**
```bash
curl -X POST http://localhost:3000/api/create-addon-session \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_002",
    "amount_cents": 199,
    "currency": "INR",
    "stripe_account_id": "acct_guru_123"
  }'
```

5. **Get Add-on Sales Status:**
```bash
curl "http://localhost:3000/api/addon-purchase-status?vendorId=acct_guru_123"
```

### Test with Node.js Scripts

Run the test scripts to verify all endpoints:

```bash
# Test subscription endpoints
node test-api.js

# Test add-on purchase endpoints
node test-addon-api.js
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