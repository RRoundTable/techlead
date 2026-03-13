import { Router } from 'express';
import { z } from 'zod';
import { ProductModel } from '../models/product';

export const productRouter = Router();

const SearchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'popular']).optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
});

productRouter.get('/', async (req, res) => {
  const params = SearchSchema.parse(req.query);
  const results = await ProductModel.search(params);
  res.json(results);
});

productRouter.get('/:id', async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

productRouter.get('/:id/related', async (req, res) => {
  const related = await ProductModel.findRelated(req.params.id);
  res.json(related);
});

productRouter.get('/categories/list', async (_req, res) => {
  const categories = await ProductModel.getCategories();
  res.json(categories);
});
