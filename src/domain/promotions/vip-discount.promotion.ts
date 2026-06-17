import { calculateCartSubtotal } from '../cart/cart-calculations';
import type { PromotionStrategy } from './promotion.types';

const VIP_DISCOUNT_RATE = 0.15;

export const vipDiscountPromotionStrategy: PromotionStrategy = {
  id: 'vip-discount',
  name: 'VIP Discount',
  description: 'VIP customers receive 15% off the subtotal.',
  isEligible: (input) =>
    input.customerType === 'vip' && calculateCartSubtotal(input.items) > 0,
  calculate: (input) => {
    const subtotalCents = calculateCartSubtotal(input.items);
    const discountCents = Math.round(subtotalCents * VIP_DISCOUNT_RATE);

    return {
      promotionId: 'vip-discount',
      promotionName: 'VIP Discount',
      discountCents,
      totalCents: subtotalCents - discountCents,
      reason: 'VIP customers receive 15% off the subtotal.',
    };
  },
};
