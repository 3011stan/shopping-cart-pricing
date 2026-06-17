import { formatMoney } from '../../../domain/money/money';
import type { Product } from '../../../domain/product/product.types';
import dressImage from '../../assets/products/dress.jpg';
import jeansImage from '../../assets/products/jeans.jpg';
import tShirtImage from '../../assets/products/t-shirt.jpg';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
  onAddProduct(product: Product): void;
};

const FALLBACK_PRESENTATION = {
  image: tShirtImage,
  note: 'Curated wardrobe piece',
};

const PRODUCT_PRESENTATION: Record<string, { image: string; note: string }> = {
  't-shirt': {
    image: tShirtImage,
    note: 'Soft cotton essential',
  },
  jeans: {
    image: jeansImage,
    note: 'Classic straight fit',
  },
  dress: {
    image: dressImage,
    note: 'Polished evening piece',
  },
};

export function ProductCard({ product, onAddProduct }: ProductCardProps) {
  const presentation = PRODUCT_PRESENTATION[product.id] ?? FALLBACK_PRESENTATION;

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={presentation.image}
        alt={product.name}
      />
      <div className={styles.body}>
        <div>
          <h3>{product.name}</h3>
          <p>{presentation.note}</p>
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
