import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth';
import { UserModel } from '../models/user';
import { sendEmail } from '../services/email';

export const userRouter = Router();

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

userRouter.post('/register', async (req, res) => {
  const { email, password, name } = RegisterSchema.parse(req.body);
  const existing = await UserModel.findByEmail(email);
  if (existing) return res.status(409).json({ error: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 12);
  const user = await UserModel.create({ email, password: hashed, name });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.status(201).json({ user: { id: user.id, email, name }, token });
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = LoginSchema.parse(req.body);
  const user = await UserModel.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
});

userRouter.get('/profile', authenticate, async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email, name: user.name });
});

userRouter.patch('/profile', authenticate, async (req, res) => {
  const updated = await UserModel.update(req.user.id, req.body);
  res.json({ id: updated.id, email: updated.email, name: updated.name });
});

userRouter.post('/password-reset', async (req, res) => {
  const { email } = z.object({ email: z.string().email() }).parse(req.body);
  const user = await UserModel.findByEmail(email);
  if (user) {
    const token = jwt.sign({ userId: user.id, type: 'reset' }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    await sendEmail(email, 'Password Reset', `Reset your password: ${process.env.APP_URL}/reset?token=${token}`);
  }
  res.json({ message: 'If that email exists, a reset link has been sent' });
});

userRouter.post('/password-reset/confirm', async (req, res) => {
  const { token, newPassword } = z.object({ token: z.string(), newPassword: z.string().min(8) }).parse(req.body);
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; type: string };
  if (decoded.type !== 'reset') return res.status(400).json({ error: 'Invalid token' });

  const hashed = await bcrypt.hash(newPassword, 12);
  await UserModel.update(decoded.userId, { password: hashed });
  res.json({ message: 'Password updated' });
});
