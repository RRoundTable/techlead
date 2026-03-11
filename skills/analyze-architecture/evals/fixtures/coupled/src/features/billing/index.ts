import Stripe from 'stripe';
import { getUserById, getUserPlan } from '../auth/index';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });

export async function createCheckoutSession(userId: string, priceId: string) {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const currentPlan = await getUserPlan(userId);
  if (currentPlan === priceId) throw new Error('Already on this plan');

  return stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.APP_URL}/billing/success`,
    cancel_url: `${process.env.APP_URL}/billing/cancel`,
  });
}

export async function cancelSubscription(userId: string) {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');
  // Would look up Stripe subscription and cancel it
}
