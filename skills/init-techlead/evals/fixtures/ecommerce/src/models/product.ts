import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  page: number;
  limit: number;
}

export const ProductModel = {
  search: async (params: SearchParams) => {
    const where: any = {};
    if (params.q) where.name = { contains: params.q, mode: 'insensitive' };
    if (params.category) where.category = params.category;
    if (params.minPrice || params.maxPrice) {
      where.price = {};
      if (params.minPrice) where.price.gte = params.minPrice;
      if (params.maxPrice) where.price.lte = params.maxPrice;
    }

    const orderBy: any = {};
    switch (params.sort) {
      case 'price_asc': orderBy.price = 'asc'; break;
      case 'price_desc': orderBy.price = 'desc'; break;
      case 'newest': orderBy.createdAt = 'desc'; break;
      default: orderBy.createdAt = 'desc';
    }

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      prisma.product.count({ where }),
    ]);

    return { items, total, page: params.page, totalPages: Math.ceil(total / params.limit) };
  },

  findById: (id: string) => prisma.product.findUnique({ where: { id } }),

  findRelated: async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return [];
    return prisma.product.findMany({
      where: { category: product.category, id: { not: id } },
      take: 4,
    });
  },

  getCategories: () =>
    prisma.product.findMany({ select: { category: true }, distinct: ['category'] }),
};
