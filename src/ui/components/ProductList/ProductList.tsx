import type { CatalogProduct } from '../../../app/products/product.types';
import type { Product } from '../../../domain/product/product.types';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

type ProductListProps = {
  products: CatalogProduct[];
  isLoading: boolean;
  isError: boolean;
  onAddProduct(product: CatalogProduct): void;
  getProductQuantity(productId: Product['id']): number;
  onIncreaseQuantity(productId: Product['id']): void;
  onDecreaseQuantity(productId: Product['id']): void;
};

export function ProductList({
  products,
  isLoading,
  isError,
  onAddProduct,
  getProductQuantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: ProductListProps) {
  return (
    <section className={styles.section} aria-labelledby="products-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Catalog</p>
          <h2 id="products-title">Products</h2>
        </div>
        <p>{isLoading ? 'Loading catalog' : `${products.length} items available`}</p>
      </div>

      {isLoading && <p className={styles.state}>Loading products...</p>}
      {isError && (
        <p className={styles.state}>Unable to load products. Please try again.</p>
      )}
      {!isLoading && !isError && (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={getProductQuantity(product.id)}
              onAddProduct={onAddProduct}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ))}
        </div>
      )}
    </section>
  );
}
