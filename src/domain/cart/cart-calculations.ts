import type { MoneyCents } from '../money/money';
import type { CartItem } from './cart.types';

export function calculateCartSubtotal(items: CartItem[]): MoneyCents {
  return items.reduce(
    (subtotal, item) => subtotal + item.product.priceCents * item.quantity,
    0,
  );
}

export function calculateCartQuantity(items: CartItem[]): number {
  return items.reduce((quantity, item) => quantity + item.quantity, 0);
}

export function expandCartItemPrices(items: CartItem[]): MoneyCents[] {
  return items.flatMap((item) =>
    Array.from({ length: item.quantity }, () => item.product.priceCents),
  );
}

