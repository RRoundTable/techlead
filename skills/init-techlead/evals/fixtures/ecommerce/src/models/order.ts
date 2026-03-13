import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const OrderModel = {
  create: (data: {
    userId: string;
    items: OrderItem[];
    total: number;
    shippingAddress: ShippingAddress;
    paymentIntentId: string;
  }) => prisma.order.create({ data: { ...data, status: 'pending' } }),

  findById: (id: string) => prisma.order.findUnique({ where: { id } }),

  findByUser: (userId: string) =>
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),

  updateStatus: (id: string, status: Order['status']) =>
    prisma.order.update({ where: { id }, data: { status } }),

  getCart: (userId: string) => prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  }),
};

export const CartModel = {
  getCart: (userId: string) => prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  }),

  addItem: async (userId: string, productId: string, quantity: number) => {
    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
    });
    return prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  },

  updateQuantity: (userId: string, productId: string, quantity: number) =>
    prisma.cartItem.update({
      where: { cartId_productId: { cartId: userId, productId } },
      data: { quantity },
    }),

  removeItem: (userId: string, productId: string) =>
    prisma.cartItem.delete({
      where: { cartId_productId: { cartId: userId, productId } },
    }),

  clearCart: async (userId: string) => {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  },
};
