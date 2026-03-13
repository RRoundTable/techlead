import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { CartModel } from '../models/order';

export const cartRouter = Router();
cartRouter.use(authenticate);

const AddItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
});

const UpdateQuantitySchema = z.object({
  quantity: z.number().int().min(0),
});

cartRouter.get('/', async (req, res) => {
  const cart = await CartModel.getCart(req.user.id);
  res.json(cart);
});

cartRouter.post('/items', async (req, res) => {
  const { productId, quantity } = AddItemSchema.parse(req.body);
  const cart = await CartModel.addItem(req.user.id, productId, quantity);
  res.json(cart);
});

cartRouter.patch('/items/:productId', async (req, res) => {
  const { quantity } = UpdateQuantitySchema.parse(req.body);
  if (quantity === 0) {
    await CartModel.removeItem(req.user.id, req.params.productId);
  } else {
    await CartModel.updateQuantity(req.user.id, req.params.productId, quantity);
  }
  const cart = await CartModel.getCart(req.user.id);
  res.json(cart);
});

cartRouter.delete('/items/:productId', async (req, res) => {
  await CartModel.removeItem(req.user.id, req.params.productId);
  res.status(204).send();
});

cartRouter.delete('/', async (req, res) => {
  await CartModel.clearCart(req.user.id);
  res.status(204).send();
});
