import type { MoneyCents } from '../money/money';

export type Product = {
  id: string;
  name: string;
  priceCents: MoneyCents;
};

