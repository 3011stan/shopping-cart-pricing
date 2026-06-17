import type { Product } from '../../domain/product/product.types';

export type CatalogProduct = Product & {
  description: string;
  imageUrl: string;
};
