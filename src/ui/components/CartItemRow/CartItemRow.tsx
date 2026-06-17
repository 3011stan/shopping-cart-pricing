import type { CartItem } from '../../../domain/cart/cart.types';
import { formatMoney } from '../../../domain/money/money';
import type { Product } from '../../../domain/product/product.types';
import styles from './CartItemRow.module.css';

type CartItemRowProps = {
  item: CartItem;
  onIncreaseQuantity(productId: Product['id']): void;
  onDecreaseQuantity(productId: Product['id']): void;
  onRemoveItem(productId: Product['id']): void;
};

export function CartItemRow({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: CartItemRowProps) {
  const { product, quantity } = item;

  return (
    <article className={styles.row}>
      <div className={styles.details}>
        <h3>{product.name}</h3>
        <p>
          {quantity} x {formatMoney(product.priceCents)}
        </p>
      </div>
      <div className={styles.actions}>
        <div
          className={styles.quantity}
          role="group"
          aria-label={`${product.name} quantity`}
        >
          <button
            type="button"
            aria-label={`Decrease ${product.name} quantity`}
            disabled={quantity === 1}
            onClick={() => onDecreaseQuantity(product.id)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            aria-label={`Increase ${product.name} quantity`}
            onClick={() => onIncreaseQuantity(product.id)}
          >
            +
          </button>
        </div>
        <strong>{formatMoney(product.priceCents * quantity)}</strong>
        <button
          type="button"
          className={styles.remove}
          aria-label={`Remove ${product.name} from cart`}
          onClick={() => onRemoveItem(product.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}
