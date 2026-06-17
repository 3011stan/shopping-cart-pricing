import { describe, expect, it } from 'vitest';
import { getProducts } from './products.api';

describe('getProducts', () => {
  it('returns the product catalog with prices in cents', async () => {
    await expect(getProducts()).resolves.toEqual([
      {
        id: 't-shirt',
        name: 'T-shirt',
        priceCents: 3599,
        description: 'Soft cotton essential',
        imageUrl: expect.stringContaining('t-shirt.jpg'),
      },
      {
        id: 'jeans',
        name: 'Jeans',
        priceCents: 6550,
        description: 'Classic straight fit',
        imageUrl: expect.stringContaining('jeans.jpg'),
      },
      {
        id: 'dress',
        name: 'Dress',
        priceCents: 8075,
        description: 'Polished evening piece',
        imageUrl: expect.stringContaining('dress.jpg'),
      },
    ]);
  });
});
