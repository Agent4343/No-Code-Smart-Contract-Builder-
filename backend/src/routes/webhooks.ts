import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../utils/prisma.js';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Stripe webhook
router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Stripe webhook secret not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  // Find user by customer ID or email
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { stripeCustomerId: customerId },
        { email: session.customer_email || undefined },
      ],
    },
  });

  if (!user) {
    console.error('User not found for checkout session:', session.id);
    return;
  }

  // Update user with Stripe customer ID if not set
  if (!user.stripeCustomerId) {
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  console.log(`Checkout completed for user ${user.id}, subscription: ${subscriptionId}`);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error('User not found for subscription:', subscription.id);
    return;
  }

  // Determine tier based on price ID
  const priceId = subscription.items.data[0]?.price.id;
  let tier: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' = 'FREE';

  if (priceId === process.env.STRIPE_PRICE_STARTER) {
    tier = 'STARTER';
  } else if (priceId === process.env.STRIPE_PRICE_PROFESSIONAL) {
    tier = 'PROFESSIONAL';
  } else if (priceId === process.env.STRIPE_PRICE_ENTERPRISE) {
    tier = 'ENTERPRISE';
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionTier: tier,
      subscriptionId: subscription.id,
      subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
    },
  });

  console.log(`Subscription updated for user ${user.id}: ${tier}`);
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error('User not found for canceled subscription:', subscription.id);
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionTier: 'FREE',
      subscriptionId: null,
      subscriptionEndsAt: null,
    },
  });

  console.log(`Subscription canceled for user ${user.id}`);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    return;
  }

  // Record transaction
  await prisma.transaction.create({
    data: {
      userId: user.id,
      type: 'SUBSCRIPTION',
      amount: (invoice.amount_paid || 0) / 100,
      currency: invoice.currency.toUpperCase(),
      stripePaymentId: invoice.payment_intent as string,
      stripeInvoiceId: invoice.id,
      status: 'succeeded',
      description: `Subscription payment - ${invoice.lines.data[0]?.description || 'Monthly'}`,
    },
  });

  console.log(`Invoice paid for user ${user.id}: $${(invoice.amount_paid || 0) / 100}`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    return;
  }

  // Record failed transaction
  await prisma.transaction.create({
    data: {
      userId: user.id,
      type: 'SUBSCRIPTION',
      amount: (invoice.amount_due || 0) / 100,
      currency: invoice.currency.toUpperCase(),
      stripeInvoiceId: invoice.id,
      status: 'failed',
      description: 'Payment failed',
    },
  });

  console.log(`Payment failed for user ${user.id}`);

  // TODO: Send email notification about failed payment
}

export default router;
