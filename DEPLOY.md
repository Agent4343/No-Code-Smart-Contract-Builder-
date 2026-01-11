# Deployment Guide - ContractForge

This guide will walk you through deploying ContractForge to make it a real, working product.

## Overview

| Component | Service | Cost |
|-----------|---------|------|
| Frontend | Vercel | Free |
| Backend | Railway | ~$5-20/month |
| Database | Railway PostgreSQL | Included |
| Wallet Connect | WalletConnect Cloud | Free |
| Blockchain RPC | Alchemy | Free tier |
| Payments | Stripe | 2.9% per transaction |

**Total monthly cost: ~$5-20**

---

## Step 1: Get Required Accounts (Free)

### 1.1 WalletConnect Project ID
1. Go to https://cloud.walletconnect.com
2. Sign up for free
3. Create a new project
4. Copy your **Project ID**

### 1.2 Alchemy API Key (for blockchain connection)
1. Go to https://www.alchemy.com
2. Sign up for free
3. Create a new app (select Ethereum Mainnet)
4. Copy your **API Key**
5. Repeat for other networks you want (Polygon, Arbitrum, etc.)

### 1.3 Stripe Account (for payments)
1. Go to https://stripe.com
2. Sign up for an account
3. Go to Developers > API Keys
4. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

---

## Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

### 2.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Select the `backend` folder as the root

### 2.3 Add PostgreSQL Database
1. In your Railway project, click "New"
2. Select "Database" > "PostgreSQL"
3. Railway will automatically set `DATABASE_URL`

### 2.4 Set Environment Variables
In Railway dashboard, go to your backend service > Variables:

```
DATABASE_URL=<automatically set by Railway>
JWT_SECRET=<generate a random 32+ character string>
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

### 2.5 Deploy
1. Railway will auto-deploy when you push to GitHub
2. Once deployed, copy your backend URL (e.g., `https://your-app.railway.app`)

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### 3.2 Import Project
1. Click "New Project"
2. Import your GitHub repository
3. Vercel will auto-detect it's a Vite project

### 3.3 Set Environment Variables
In Vercel dashboard, go to Settings > Environment Variables:

```
VITE_API_URL=https://your-backend.railway.app/api
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_from_step_1
```

### 3.4 Update vercel.json
Make sure the API rewrite points to your Railway backend:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend.railway.app/api/:path*"
    }
  ]
}
```

### 3.5 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your app is live!

---

## Step 4: Set Up Stripe Webhooks

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Enter: `https://your-backend.railway.app/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret
6. Add it to Railway as `STRIPE_WEBHOOK_SECRET`

---

## Step 5: Initialize Database

Run these commands (or use Railway's shell):

```bash
cd backend
npx prisma db push
```

This creates all the database tables.

---

## Step 6: Test Everything

### Test Wallet Connection
1. Visit your Vercel URL
2. Click "Connect Wallet"
3. Connect with MetaMask
4. Should show your address

### Test Contract Builder
1. Go to Builder
2. Drag some blocks
3. Click Generate
4. Should show Solidity code

### Test on Testnet
1. Switch MetaMask to Sepolia testnet
2. Get free test ETH from https://sepoliafaucet.com
3. Try deploying a contract

---

## Costs Breakdown

| Item | Monthly Cost |
|------|-------------|
| Railway Hobby Plan | $5 |
| Railway Database | Included |
| Vercel | Free |
| Alchemy | Free (up to 300M compute units) |
| WalletConnect | Free |
| Stripe | 2.9% + $0.30 per transaction |

**Minimum to run: $5/month**

---

## Going Live Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Database created and migrated
- [ ] WalletConnect Project ID set
- [ ] Alchemy API keys set
- [ ] Stripe connected
- [ ] Stripe webhooks configured
- [ ] Tested wallet connection
- [ ] Tested contract generation
- [ ] Tested testnet deployment

---

## Troubleshooting

### "Cannot connect wallet"
- Check WalletConnect Project ID is correct
- Make sure you're on a supported network

### "API errors"
- Check Railway logs for backend errors
- Verify environment variables are set

### "Database errors"
- Run `npx prisma db push` to sync schema
- Check DATABASE_URL is correct

### "Deployment fails"
- Check Vercel build logs
- Make sure all TypeScript errors are fixed

---

## Security Best Practices

### Environment Variables
- **Never commit secrets**: Keep `.env` files in `.gitignore`
- **Use strong JWT secrets**: Generate with `openssl rand -hex 32`
- **Rotate secrets regularly**: Update JWT_SECRET every 90 days
- **Use different keys per environment**: Separate test/production keys

### API Security
- **Rate limiting**: Backend includes built-in rate limiting
- **CORS**: Configured to only accept requests from your frontend domain
- **Input validation**: All inputs validated with Zod schemas
- **SQL injection prevention**: Prisma ORM handles parameterized queries

### Wallet Security
- **Never store private keys**: Platform never has access to user private keys
- **Use hardware wallets**: Recommend hardware wallets for mainnet deployments
- **Verify contract addresses**: Always verify deployed contracts on block explorers

### Stripe Security
- **Webhook verification**: Always verify webhook signatures
- **Use test mode first**: Test all payment flows with `sk_test_` keys
- **Enable Stripe Radar**: Built-in fraud protection

---

## Need Help?

1. Check Railway logs: Railway Dashboard > Your Service > Logs
2. Check Vercel logs: Vercel Dashboard > Your Project > Functions
3. Check browser console for frontend errors

---

## Extended Troubleshooting

### "Contract compilation fails"
- Ensure Solidity version is compatible (^0.8.20)
- Check for missing imports or syntax errors
- Verify block configurations are complete

### "Transaction stuck pending"
- Check network congestion on block explorer
- Increase gas price for faster confirmation
- Verify wallet has sufficient funds for gas

### "Wallet shows wrong network"
- Click network selector in MetaMask
- Add custom RPC if network is missing
- Clear browser cache and reconnect wallet

### "Stripe payments not working"
- Verify webhook endpoint is accessible (not blocked by firewall)
- Check webhook signing secret matches exactly
- Ensure Stripe account is activated for live payments

### "Gas estimation errors"
- Contract may have reverts - check security scan results
- Some operations require specific conditions (e.g., token balance)
- Try deploying to testnet first to identify issues

---

## Testnet Faucets

Get free test tokens for testing:

| Network | Faucet URL |
|---------|------------|
| Sepolia | https://sepoliafaucet.com |
| Polygon Amoy | https://faucet.polygon.technology |
| BSC Testnet | https://testnet.bnbchain.org/faucet-smart |
| Arbitrum Sepolia | https://faucet.arbitrum.io |
| Base Sepolia | https://faucet.base.org |

---

## Support Resources

- **Documentation**: This guide and backend/README.md
- **GitHub Issues**: Report bugs and request features
- **Discord Community**: Join for community support (coming soon)
- **Email Support**: For enterprise customers
