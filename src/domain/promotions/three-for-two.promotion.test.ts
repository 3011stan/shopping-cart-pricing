import { describe, expect, it } from 'vitest';
import type { CartItem } from '../cart/cart.types';
import type { Product } from '../product/product.types';
import { threeForTwoPromotionStrategy } from './three-for-two.promotion';

const T_SHIRT: Product = {
  id: 't-shirt',
  name: 'T-shirt',
  priceCents: 3599,
};

const JEANS: Product = {
  id: 'jeans',
  name: 'Jeans',
  priceCents: 6550,
};

const DRESS: Product = {
  id: 'dress',
  name: 'Dress',
  priceCents: 8075,
};

function cartItem(product: Product, quantity: number): CartItem {
  return { product, quantity };
}

describe('threeForTwoPromotionStrategy', () => {
  it('is not eligible when the cart has fewer than 3 items', () => {
    const input = {
      customerType: 'common' as const,
      items: [cartItem(T_SHIRT, 2)],
    };

    expect(threeForTwoPromotionStrategy.isEligible(input)).toBe(false);
    expect(threeForTwoPromotionStrategy.calculate(input).discountCents).toBe(0);
  });

  it('makes 1 cheapest item free when the cart has 3 items', () => {
    const result = threeForTwoPromotionStrategy.calculate({
      customerType: 'common',
      items: [cartItem(T_SHIRT, 2), cartItem(JEANS, 1)],
    });

    expect(result.discountCents).toBe(3599);
    expect(result.totalCents).toBe(10149);
  });

  it('makes 2 cheapest items free when the cart has 6 items', () => {
    const result = threeForTwoPromotionStrategy.calculate({
      customerType: 'common',
      items: [cartItem(T_SHIRT, 2), cartItem(JEANS, 2), cartItem(DRESS, 2)],
    });

    expect(result.discountCents).toBe(7198);
  });

  it('selects the cheapest items as free items', () => {
    const result = threeForTwoPromotionStrategy.calculate({
      customerType: 'common',
      items: [cartItem(DRESS, 2), cartItem(JEANS, 1)],
    });

    expect(result.discountCents).toBe(6550);
  });

  it('applies across the entire cart, not per product type', () => {
    const result = threeForTwoPromotionStrategy.calculate({
      customerType: 'common',
      items: [cartItem(T_SHIRT, 1), cartItem(JEANS, 1), cartItem(DRESS, 1)],
    });

    expect(result.discountCents).toBe(3599);
    expect(result.totalCents).toBe(14625);
  });
});
