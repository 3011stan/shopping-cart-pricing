import shoppingBagIcon from '../../assets/shopping-bag.svg';
import styles from './EmptyCart.module.css';

export function EmptyCart() {
  return (
    <div className={styles.empty}>
      <div className={styles.icon} aria-hidden="true">
        <img src={shoppingBagIcon} alt="" />
      </div>
      <div>
        <h3>Your cart is empty</h3>
        <p>Add products to compare pricing options.</p>
      </div>
    </div>
  );
}
