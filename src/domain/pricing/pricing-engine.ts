import { calculateCartSubtotal } from '../cart/cart-calculations';
import { noPromotionStrategy } from '../promotions/no-promotion';
import type {
  PricingInput,
  PromotionId,
  PromotionResult,
  PromotionStrategy,
} from '../promotions/promotion.types';
import { threeForTwoPromotionStrategy } from '../promotions/three-for-two.promotion';
import { vipDiscountPromotionStrategy } from '../promotions/vip-discount.promotion';

export type PricingSummary = {
  subtotalCents: number;
  options: PromotionResult[];
  recommendedOption: PromotionResult;
  savingsCents: number;
};

const DEFAULT_PROMOTION_STRATEGIES: PromotionStrategy[] = [
  threeForTwoPromotionStrategy,
  vipDiscountPromotionStrategy,
  noPromotionStrategy,
];

const PROMOTION_PRIORITY: PromotionId[] = [
  'three-for-two',
  'vip-discount',
  'no-promotion',
];

export function calculateBestPricingOption(
  input: PricingInput,
  strategies = DEFAULT_PROMOTION_STRATEGIES,
): PricingSummary {
  const subtotalCents = calculateCartSubtotal(input.items);
  const options = strategies
    .filter((strategy) => strategy.isEligible(input))
    .map((strategy) => strategy.calculate(input));
  const recommendedOption = [...options].sort(comparePromotionResults)[0];

  return {
    subtotalCents,
    options,
    recommendedOption,
    savingsCents: subtotalCents - recommendedOption.totalCents,
  };
}

function comparePromotionResults(
  firstOption: PromotionResult,
  secondOption: PromotionResult,
): number {
  if (firstOption.totalCents !== secondOption.totalCents) {
    return firstOption.totalCents - secondOption.totalCents;
  }

  return (
    PROMOTION_PRIORITY.indexOf(firstOption.promotionId) -
    PROMOTION_PRIORITY.indexOf(secondOption.promotionId)
  );
}
