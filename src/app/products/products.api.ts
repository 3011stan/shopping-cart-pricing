import type { Product } from '../../domain/product/product.types';

const PRODUCTS: Product[] = [
  {
    id: 't-shirt',
    name: 'T-shirt',
    priceCents: 3599,
  },
  {
    id: 'jeans',
    name: 'Jeans',
    priceCents: 6550,
  },
  {
    id: 'dress',
    name: 'Dress',
    priceCents: 8075,
  },
];

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS.map((product) => ({ ...product }));
}
