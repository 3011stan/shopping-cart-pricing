import { useId } from 'react';
import type { CartItem } from '../../../domain/cart/cart.types';
import { calculateCartQuantity } from '../../../domain/cart/cart-calculations';
import type { PricingSummary as PricingSummaryModel } from '../../../domain/pricing/pricing-engine';
import type { Product } from '../../../domain/product/product.types';
import { CartItemRow } from '../CartItemRow/CartItemRow';
import { EmptyCart } from '../EmptyCart/EmptyCart';
import { PricingSummary } from '../PricingSummary/PricingSummary';
import { PromotionComparison } from '../PromotionComparison/PromotionComparison';
import styles from './CheckoutPanel.module.css';

type CheckoutPanelProps = {
  items: CartItem[];
  pricingSummary: PricingSummaryModel;
  onIncreaseQuantity(productId: Product['id']): void;
  onDecreaseQuantity(productId: Product['id']): void;
  onRemoveItem(productId: Product['id']): void;
};

export function CheckoutPanel({
  items,
  pricingSummary,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: CheckoutPanelProps) {
  const titleId = useId();
  const hasItems = items.length > 0;
  const itemCount = calculateCartQuantity(items);

  return (
    <aside className={styles.panel} aria-labelledby={titleId}>
      <div className={styles.header}>
        <p>Checkout</p>
        <h2 id={titleId}>Cart & pricing</h2>
      </div>

      {!hasItems && <EmptyCart />}

      {hasItems && (
        <>
          <div className={styles.items} aria-label="Cart items">
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onIncreaseQuantity={onIncreaseQuantity}
                onDecreaseQuantity={onDecreaseQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
          <PricingSummary pricingSummary={pricingSummary} />
          <PromotionComparison
            itemCount={itemCount}
            pricingSummary={pricingSummary}
          />
        </>
      )}
    </aside>
  );
}
