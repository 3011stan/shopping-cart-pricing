import { describe, expect, it } from 'vitest';
import { getProducts } from './products.api';

describe('getProducts', () => {
  it('returns the product catalog with prices in cents', async () => {
    await expect(getProducts()).resolves.toEqual([
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
    ]);
  });
});

