import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const TaskModel = {
  findAll: () => prisma.task.findMany({ orderBy: { createdAt: 'desc' } }),

  findById: (id: string) => prisma.task.findUnique({ where: { id } }),

  create: (data: { title: string; description?: string; priority?: string }) =>
    prisma.task.create({ data }),

  update: (id: string, data: Partial<Task>) =>
    prisma.task.update({ where: { id }, data }),

  delete: (id: string) => prisma.task.delete({ where: { id } }),
};
