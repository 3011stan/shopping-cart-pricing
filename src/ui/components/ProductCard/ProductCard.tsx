import type { CatalogProduct } from '../../../app/products/product.types';
import { formatMoney } from '../../../domain/money/money';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: CatalogProduct;
  onAddProduct(product: CatalogProduct): void;
};

export function ProductCard({ product, onAddProduct }: ProductCardProps) {
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
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => onAddProduct(product)}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
