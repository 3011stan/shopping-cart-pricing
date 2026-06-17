import type { CatalogProduct } from '../../../app/products/product.types';
import { formatMoney } from '../../../domain/money/money';
import type { Product } from '../../../domain/product/product.types';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: CatalogProduct;
  quantityInCart: number;
  onAddProduct(product: CatalogProduct): void;
  onIncreaseQuantity(productId: Product['id']): void;
  onDecreaseQuantity(productId: Product['id']): void;
};

export function ProductCard({
  product,
  quantityInCart,
  onAddProduct,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: ProductCardProps) {
  const hasItemInCart = quantityInCart > 0;

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={product.imageUrl}
        alt={product.name}
      />
      <div className={styles.body}>
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className={styles.footer}>
          <strong>{formatMoney(product.priceCents)}</strong>
          {!hasItemInCart && (
            <button
              type="button"
              className={styles.addButton}
              aria-label={`Add ${product.name} to cart`}
              onClick={() => onAddProduct(product)}
            >
              Add
            </button>
          )}
          {hasItemInCart && (
            <div
              className={styles.quantity}
              role="group"
              aria-label={`${product.name} quantity in product card`}
            >
              <button
                type="button"
                aria-label={`Decrease ${product.name} quantity from product card`}
                disabled={quantityInCart === 1}
                onClick={() => onDecreaseQuantity(product.id)}
              >
                -
              </button>
              <span>{quantityInCart}</span>
              <button
                type="button"
                aria-label={`Increase ${product.name} quantity from product card`}
                onClick={() => onIncreaseQuantity(product.id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
