import {
  calculateCartQuantity,
  calculateCartSubtotal,
  expandCartItemPrices,
} from '../cart/cart-calculations';
import type { PromotionStrategy } from './promotion.types';

export const threeForTwoPromotionStrategy: PromotionStrategy = {
  id: 'three-for-two',
  name: 'Get 3 for 2',
  description: 'For every 3 items in the cart, the cheapest item is free.',
  isEligible: (input) => calculateCartQuantity(input.items) >= 3,
  calculate: (input) => {
    const subtotalCents = calculateCartSubtotal(input.items);
    const sortedPricesCents = expandCartItemPrices(input.items).sort(
      (firstPrice, secondPrice) => firstPrice - secondPrice,
    );
    const freeItemsCount = Math.floor(sortedPricesCents.length / 3);
    const discountCents = sortedPricesCents
      .slice(0, freeItemsCount)
      .reduce((discount, priceCents) => discount + priceCents, 0);

    return {
      promotionId: 'three-for-two',
      promotionName: 'Get 3 for 2',
      discountCents,
      totalCents: subtotalCents - discountCents,
      reason:
        discountCents > 0
          ? 'The cheapest item in each group of three is free.'
          : 'Add at least 3 items to use this promotion.',
    };
  },
};
