import { Router } from 'express';
import { z } from 'zod';
import { TaskModel } from '../models/task';

export const taskRouter = Router();

const CreateTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

taskRouter.get('/', async (_req, res) => {
  const tasks = await TaskModel.findAll();
  res.json(tasks);
});

taskRouter.get('/:id', async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

taskRouter.post('/', async (req, res) => {
  const parsed = CreateTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const task = await TaskModel.create(parsed.data);
  res.status(201).json(task);
});

taskRouter.patch('/:id', async (req, res) => {
  const task = await TaskModel.update(req.params.id, req.body);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

taskRouter.delete('/:id', async (req, res) => {
  await TaskModel.delete(req.params.id);
  res.status(204).send();
});
