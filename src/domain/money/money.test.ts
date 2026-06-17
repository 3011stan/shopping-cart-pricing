import { describe, expect, it } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
  it('formats cents as USD', () => {
    expect(formatMoney(7198)).toBe('$71.98');
  });
});

