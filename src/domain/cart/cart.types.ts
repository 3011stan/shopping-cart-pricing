import type { Product } from '../product/product.types';

export type CustomerType = 'common' | 'vip';

export type CartItem = {
  product: Product;
  quantity: number;
};

