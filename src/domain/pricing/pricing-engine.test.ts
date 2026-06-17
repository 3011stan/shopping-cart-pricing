import { describe, expect, it } from 'vitest';
import type { CartItem } from '../cart/cart.types';
import type { Product } from '../product/product.types';
import { calculateBestPricingOption } from './pricing-engine';

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

describe('calculateBestPricingOption', () => {
  it('returns USD 71.98 for a common customer with 3 T-shirts', () => {
    const summary = calculateBestPricingOption({
      customerType: 'common',
      items: [cartItem(T_SHIRT, 3)],
    });

    expect(summary.subtotalCents).toBe(10797);
    expect(summary.recommendedOption.promotionId).toBe('three-for-two');
    expect(summary.recommendedOption.discountCents).toBe(3599);
    expect(summary.recommendedOption.totalCents).toBe(7198);
    expect(summary.savingsCents).toBe(3599);
  });

  it('returns USD 166.99 for a common customer with 2 T-shirts and 2 Jeans', () => {
    const summary = calculateBestPricingOption({
      customerType: 'common',
      items: [cartItem(T_SHIRT, 2), cartItem(JEANS, 2)],
    });

    expect(summary.subtotalCents).toBe(20298);
    expect(summary.recommendedOption.promotionId).toBe('three-for-two');
    expect(summary.recommendedOption.discountCents).toBe(3599);
    expect(summary.recommendedOption.totalCents).toBe(16699);
    expect(summary.savingsCents).toBe(3599);
  });

  it('recommends Get 3 for 2 for a VIP customer with 3 Dresses', () => {
    const summary = calculateBestPricingOption({
      customerType: 'vip',
      items: [cartItem(DRESS, 3)],
    });

    expect(summary.subtotalCents).toBe(24225);
    expect(summary.recommendedOption.promotionId).toBe('three-for-two');
    expect(summary.recommendedOption.totalCents).toBe(16150);
  });

  it('recommends Get 3 for 2 for a VIP customer with 2 Jeans and 2 Dresses', () => {
    const summary = calculateBestPricingOption({
      customerType: 'vip',
      items: [cartItem(JEANS, 2), cartItem(DRESS, 2)],
    });

    expect(summary.subtotalCents).toBe(29250);
    expect(summary.recommendedOption.promotionId).toBe('three-for-two');
    expect(summary.recommendedOption.discountCents).toBe(6550);
    expect(summary.recommendedOption.totalCents).toBe(22700);
  });

  it('recommends Get 3 for 2 for a VIP customer with 4 T-shirts and 1 Jeans', () => {
    const summary = calculateBestPricingOption({
      customerType: 'vip',
      items: [cartItem(T_SHIRT, 4), cartItem(JEANS, 1)],
    });

    expect(summary.subtotalCents).toBe(20946);
    expect(summary.recommendedOption.promotionId).toBe('three-for-two');
    expect(summary.recommendedOption.discountCents).toBe(3599);
    expect(summary.recommendedOption.totalCents).toBe(17347);
  });

  it('does not combine VIP Discount with Get 3 for 2', () => {
    const summary = calculateBestPricingOption({
      customerType: 'vip',
      items: [cartItem(DRESS, 3)],
    });

    const getThreeForTwoOption = summary.options.find(
      (option) => option.promotionId === 'three-for-two',
    );
    const vipOption = summary.options.find(
      (option) => option.promotionId === 'vip-discount',
    );

    expect(getThreeForTwoOption?.totalCents).toBe(16150);
    expect(vipOption?.totalCents).toBe(20591);
    expect(summary.recommendedOption.totalCents).toBe(16150);
  });

  it('recommends no promotion for an empty VIP cart', () => {
    const summary = calculateBestPricingOption({
      customerType: 'vip',
      items: [],
    });

    expect(summary.options.map((option) => option.promotionId)).toEqual([
      'no-promotion',
    ]);
    expect(summary.recommendedOption.promotionId).toBe('no-promotion');
    expect(summary.recommendedOption.totalCents).toBe(0);
  });
});

