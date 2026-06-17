import type { CartItem, CustomerType } from '../cart/cart.types';
import type { MoneyCents } from '../money/money';

export type PromotionId = 'three-for-two' | 'vip-discount' | 'no-promotion';

export type PricingInput = {
  items: CartItem[];
  customerType: CustomerType;
};

export type PromotionResult = {
  promotionId: PromotionId;
  promotionName: string;
  discountCents: MoneyCents;
  totalCents: MoneyCents;
  reason: string;
};

export type PromotionStrategy = {
  id: PromotionId;
  name: string;
  description: string;
  isEligible(input: PricingInput): boolean;
  calculate(input: PricingInput): PromotionResult;
};

