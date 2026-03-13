import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { OrderModel } from '../models/order';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const orderRouter = Router();
orderRouter.use(authenticate);

const CheckoutSchema = z.object({
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
  }),
  paymentMethodId: z.string(),
});

orderRouter.post('/checkout', async (req, res) => {
  const { shippingAddress, paymentMethodId } = CheckoutSchema.parse(req.body);
  const cart = await OrderModel.getCart(req.user.id);
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.total,
    currency: 'usd',
    payment_method: paymentMethodId,
    confirm: true,
  });

  const order = await OrderModel.create({
    userId: req.user.id,
    items: cart.items,
    total: cart.total,
    shippingAddress,
    paymentIntentId: paymentIntent.id,
  });

  res.status(201).json(order);
});

orderRouter.get('/', async (req, res) => {
  const orders = await OrderModel.findByUser(req.user.id);
  res.json(orders);
});

orderRouter.get('/:id', async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order || order.userId !== req.user.id) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

orderRouter.post('/:id/cancel', async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order || order.userId !== req.user.id) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (order.status !== 'pending' && order.status !== 'processing') {
    return res.status(400).json({ error: 'Order cannot be cancelled' });
  }

  await stripe.refunds.create({ payment_intent: order.paymentIntentId });
  const cancelled = await OrderModel.updateStatus(req.params.id, 'cancelled');
  res.json(cancelled);
});
