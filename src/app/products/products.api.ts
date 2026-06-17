import dressImage from '../../assets/products/dress.jpg';
import jeansImage from '../../assets/products/jeans.jpg';
import tShirtImage from '../../assets/products/t-shirt.jpg';
import type { CatalogProduct } from './product.types';

const PRODUCTS: CatalogProduct[] = [
  {
    id: 't-shirt',
    name: 'T-shirt',
    priceCents: 3599,
    description: 'Soft cotton essential',
    imageUrl: tShirtImage,
  },
  {
    id: 'jeans',
    name: 'Jeans',
    priceCents: 6550,
    description: 'Classic straight fit',
    imageUrl: jeansImage,
  },
  {
    id: 'dress',
    name: 'Dress',
    priceCents: 8075,
    description: 'Polished evening piece',
    imageUrl: dressImage,
  },
];

export async function getProducts(): Promise<CatalogProduct[]> {
  return PRODUCTS.map((product) => ({ ...product }));
}
