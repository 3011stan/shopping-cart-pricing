export type MoneyCents = number;

export function formatMoney(cents: MoneyCents, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

