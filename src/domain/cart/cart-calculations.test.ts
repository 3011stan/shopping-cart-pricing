import { describe, expect, it } from 'vitest';
import type { Product } from '../product/product.types';
import {
  calculateCartQuantity,
  calculateCartSubtotal,
  expandCartItemPrices,
} from './cart-calculations';
import type { CartItem } from './cart.types';

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

function cartItem(product: Product, quantity: number): CartItem {
  return { product, quantity };
}

describe('cart calculations', () => {
  it('calculates subtotal in cents using item quantities', () => {
    const subtotalCents = calculateCartSubtotal([
      cartItem(T_SHIRT, 2),
      cartItem(JEANS, 1),
    ]);

    expect(subtotalCents).toBe(13748);
  });

  it('calculates total cart quantity', () => {
    const quantity = calculateCartQuantity([
      cartItem(T_SHIRT, 2),
      cartItem(JEANS, 3),
    ]);

    expect(quantity).toBe(5);
  });

  it('expands cart items into unit prices', () => {
    const prices = expandCartItemPrices([
      cartItem(T_SHIRT, 2),
      cartItem(JEANS, 1),
    ]);

    expect(prices).toEqual([3599, 3599, 6550]);
  });
});

