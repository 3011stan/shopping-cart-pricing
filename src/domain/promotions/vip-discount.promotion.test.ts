import { describe, expect, it } from 'vitest';
import type { CartItem } from '../cart/cart.types';
import type { Product } from '../product/product.types';
import { vipDiscountPromotionStrategy } from './vip-discount.promotion';

const T_SHIRT: Product = {
  id: 't-shirt',
  name: 'T-shirt',
  priceCents: 3599,
};

function cartItem(product: Product, quantity: number): CartItem {
  return { product, quantity };
}

describe('vipDiscountPromotionStrategy', () => {
  it('calculates a 15% discount rounded to the nearest cent', () => {
    const result = vipDiscountPromotionStrategy.calculate({
      customerType: 'vip',
      items: [cartItem(T_SHIRT, 1)],
    });

    expect(result.discountCents).toBe(540);
    expect(result.totalCents).toBe(3059);
  });

  it('is eligible only for VIP customers with a positive subtotal', () => {
    expect(
      vipDiscountPromotionStrategy.isEligible({
        customerType: 'common',
        items: [cartItem(T_SHIRT, 1)],
      }),
    ).toBe(false);
    expect(
      vipDiscountPromotionStrategy.isEligible({
        customerType: 'vip',
        items: [],
      }),
    ).toBe(false);
    expect(
      vipDiscountPromotionStrategy.isEligible({
        customerType: 'vip',
        items: [cartItem(T_SHIRT, 1)],
      }),
    ).toBe(true);
  });
});

