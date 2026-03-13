import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const notificationRouter = Router();

const PreferencesSchema = z.object({
  orderUpdates: z.boolean().optional(),
  promotions: z.boolean().optional(),
  reviewReplies: z.boolean().optional(),
  priceDrops: z.boolean().optional(),
});

notificationRouter.get('/', authenticate, async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  res.json(notifications);
});

notificationRouter.patch('/:id/read', authenticate, async (req, res) => {
  await prisma.notification.update({
    where: { id: req.params.id, userId: req.user.id },
    data: { readAt: new Date() },
  });
  res.json({ message: 'Marked as read' });
});

notificationRouter.post('/read-all', authenticate, async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, readAt: null },
    data: { readAt: new Date() },
  });
  res.json({ message: 'All notifications marked as read' });
});

notificationRouter.get('/preferences', authenticate, async (req, res) => {
  const prefs = await prisma.emailPreference.findUnique({
    where: { userId: req.user.id },
  });
  res.json(prefs || { orderUpdates: true, promotions: false, reviewReplies: true, priceDrops: false });
});

notificationRouter.patch('/preferences', authenticate, async (req, res) => {
  const data = PreferencesSchema.parse(req.body);
  const prefs = await prisma.emailPreference.upsert({
    where: { userId: req.user.id },
    update: data,
    create: { userId: req.user.id, ...data },
  });
  res.json(prefs);
});
