import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { productRouter } from './routes/products';
import { cartRouter } from './routes/cart';
import { orderRouter } from './routes/orders';
import { userRouter } from './routes/users';
import { reviewRouter } from './routes/reviews';
import { notificationRouter } from './routes/notifications';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/notifications', notificationRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`ShopWave running on port ${PORT}`);
});

export default app;
