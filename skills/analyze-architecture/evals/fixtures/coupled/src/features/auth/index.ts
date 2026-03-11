import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  planId: string;
}

export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): { userId: string; role: string } {
  return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } }) as unknown as User | null;
}

export async function getUserPlan(userId: string): Promise<string> {
  const user = await getUserById(userId);
  return user?.planId || 'free';
}
