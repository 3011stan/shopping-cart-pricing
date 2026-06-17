import { calculateCartSubtotal } from '../cart/cart-calculations';
import type { PromotionStrategy } from './promotion.types';

export const noPromotionStrategy: PromotionStrategy = {
  id: 'no-promotion',
  name: 'No promotion',
  description: 'Pay the cart subtotal without a promotion.',
  isEligible: () => true,
  calculate: (input) => {
    const subtotalCents = calculateCartSubtotal(input.items);

    return {
      promotionId: 'no-promotion',
      promotionName: 'No promotion',
      discountCents: 0,
      totalCents: subtotalCents,
      reason: 'No promotion is applied.',
    };
  },
};

