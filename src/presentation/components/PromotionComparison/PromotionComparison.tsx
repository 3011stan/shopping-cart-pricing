import { useId } from 'react';
import { formatMoney } from '../../../domain/money/money';
import type { PricingSummary } from '../../../domain/pricing/pricing-engine';
import styles from './PromotionComparison.module.css';

type PromotionComparisonProps = {
  itemCount: number;
  pricingSummary: PricingSummary;
};

export function PromotionComparison({
  itemCount,
  pricingSummary,
}: PromotionComparisonProps) {
  const titleId = useId();
  const showThreeForTwoHint =
    itemCount > 0 &&
    itemCount < 3 &&
    !pricingSummary.options.some(
      (option) => option.promotionId === 'three-for-two',
    );

  return (
    <section className={styles.comparison} aria-labelledby={titleId}>
      <h3 id={titleId}>Relevant options</h3>
      <div className={styles.options}>
        {pricingSummary.options.map((option) => {
          const isRecommended =
            option.promotionId === pricingSummary.recommendedOption.promotionId;

          return (
            <article
              key={option.promotionId}
              className={isRecommended ? styles.recommended : styles.option}
            >
              <div>
                <h4>{option.promotionName}</h4>
                {isRecommended && <span>Recommended</span>}
              </div>
              <strong>{formatMoney(option.totalCents)}</strong>
            </article>
          );
        })}
      </div>
      {showThreeForTwoHint && (
        <p className={styles.hint}>
          Get 3 for 2 unlocks when the cart has at least 3 items.
        </p>
      )}
    </section>
  );
}
