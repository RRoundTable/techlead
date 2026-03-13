import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const reviewRouter = Router();

const CreateReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100),
  body: z.string().max(2000),
});

reviewRouter.get('/product/:productId', async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: { productId: req.params.productId },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });
  const avg = await prisma.review.aggregate({
    where: { productId: req.params.productId },
    _avg: { rating: true },
    _count: true,
  });
  res.json({ reviews, averageRating: avg._avg.rating, totalReviews: avg._count });
});

reviewRouter.post('/', authenticate, async (req, res) => {
  const data = CreateReviewSchema.parse(req.body);
  const existing = await prisma.review.findFirst({
    where: { productId: data.productId, userId: req.user.id },
  });
  if (existing) return res.status(409).json({ error: 'You already reviewed this product' });

  const review = await prisma.review.create({
    data: { ...data, userId: req.user.id },
  });
  res.status(201).json(review);
});

reviewRouter.post('/:id/flag', authenticate, async (req, res) => {
  const { reason } = z.object({ reason: z.string().max(500) }).parse(req.body);
  await prisma.reviewFlag.create({
    data: { reviewId: req.params.id, userId: req.user.id, reason },
  });
  res.json({ message: 'Review flagged for moderation' });
});
