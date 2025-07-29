# Deployment Guide

## Deploying to Vercel

### Prerequisites
1. A Vercel account
2. A GitHub repository with your code
3. Stripe account with test API keys

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure all environment variables are documented in `env.example`

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository and click "Deploy"

### Step 3: Configure Environment Variables
In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add the following variables:
   ```
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   STRIPE_PLATFORM_ACCOUNT_ID=acct_platform_123
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

### Step 4: Configure Stripe Webhooks
1. Go to your Stripe Dashboard → Webhooks
2. Create a new webhook endpoint
3. Set the endpoint URL to: `https://your-app.vercel.app/api/webhook-stripe`
4. Select these events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the webhook secret and add it to your Vercel environment variables

### Step 5: Deploy
1. Vercel will automatically deploy your app
2. Your API will be available at `https://your-app.vercel.app`

### Step 6: Test Your Deployment
```bash
# Test health endpoint
curl https://your-app.vercel.app/api/health

# Test subscription creation
curl -X POST https://your-app.vercel.app/api/create-subscription-session \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_001",
    "amount_cents": 300000,
    "currency": "INR",
    "stripe_account_id": "acct_guru_123"
  }'

# Test vendor sales status
curl "https://your-app.vercel.app/api/vendor-sales-status?vendorId=VENDOR_001"
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key (test mode) | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key (test mode) | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook endpoint secret from Stripe | `whsec_...` |
| `STRIPE_PLATFORM_ACCOUNT_ID` | Your platform Stripe Connect account ID | `acct_platform_123` |
| `NEXTAUTH_URL` | Your application URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Random secret for NextAuth | `random-secret-string` |

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes locally

2. **Environment Variables Not Working**
   - Verify all variables are set in Vercel dashboard
   - Check that variable names match exactly

3. **Stripe Webhook Failures**
   - Verify webhook URL is correct
   - Check webhook secret is properly set
   - Ensure HTTPS is used (required by Stripe)

4. **CORS Issues**
   - Check that CORS headers are properly configured
   - Verify `vercel.json` is in the root directory

### Getting Help

1. Check Vercel deployment logs in the dashboard
2. Review Stripe webhook logs in the Stripe dashboard
3. Test endpoints locally first with `npm run dev` 