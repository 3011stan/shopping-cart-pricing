import { useMemo } from 'react';
import { useCart } from '../../app/cart/use-cart';
import { useProducts } from '../../app/products/use-products';
import { calculateBestPricingOption } from '../../domain/pricing/pricing-engine';
import { CheckoutPanel } from '../components/CheckoutPanel/CheckoutPanel';
import { CustomerTypeSelector } from '../components/CustomerTypeSelector/CustomerTypeSelector';
import { ProductList } from '../components/ProductList/ProductList';
import styles from './ShoppingCartPage.module.css';

export function ShoppingCartPage() {
  const productsQuery = useProducts();
  const {
    items,
    customerType,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    changeCustomerType,
  } = useCart();
  const pricingSummary = useMemo(
    () => calculateBestPricingOption({ items, customerType }),
    [items, customerType],
  );

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Navalia tech challenge</p>
            <h1>Shopping Cart Pricing Simulator</h1>
            <p>
              Add products, choose a customer type, and compare the best pricing
              option before checkout.
            </p>
          </div>
          <CustomerTypeSelector
            customerType={customerType}
            onChange={changeCustomerType}
          />
        </header>

        <div className={styles.layout}>
          <ProductList
            products={productsQuery.data ?? []}
            isLoading={productsQuery.isLoading}
            isError={productsQuery.isError}
            onAddProduct={addItem}
          />
          <CheckoutPanel
            items={items}
            pricingSummary={pricingSummary}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            onRemoveItem={removeItem}
          />
        </div>
      </div>
    </main>
  );
}
