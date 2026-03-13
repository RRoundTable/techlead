import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  findById: (id: string) => prisma.user.findUnique({ where: { id } }),

  create: (data: { email: string; password: string; name: string }) =>
    prisma.user.create({ data }),

  update: (id: string, data: Partial<User>) =>
    prisma.user.update({ where: { id }, data }),
};
