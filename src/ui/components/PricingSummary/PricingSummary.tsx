import { useId } from 'react';
import { formatMoney } from '../../../domain/money/money';
import type { PricingSummary as PricingSummaryModel } from '../../../domain/pricing/pricing-engine';
import styles from './PricingSummary.module.css';

type PricingSummaryProps = {
  pricingSummary: PricingSummaryModel;
};

export function PricingSummary({ pricingSummary }: PricingSummaryProps) {
  const titleId = useId();
  const { subtotalCents, savingsCents, recommendedOption } = pricingSummary;
  const savingsLabel =
    savingsCents > 0 ? `-${formatMoney(savingsCents)}` : formatMoney(0);

  return (
    <section className={styles.summary} aria-labelledby={titleId}>
      <h3 id={titleId}>Pricing summary</h3>
      <dl className={styles.rows}>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatMoney(subtotalCents)}</dd>
        </div>
        <div>
          <dt>Savings</dt>
          <dd className={styles.savings}>{savingsLabel}</dd>
        </div>
      </dl>
      <div className={styles.total}>
        <span>Final total</span>
        <strong>{formatMoney(recommendedOption.totalCents)}</strong>
      </div>
      <div className={styles.recommendation}>
        <p>
          <span>Recommended</span>
        </p>
        <strong>{recommendedOption.promotionName}</strong>
        <span>{recommendedOption.reason}</span>
      </div>
    </section>
  );
}
