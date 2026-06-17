import type { CustomerType } from '../../../domain/cart/cart.types';
import styles from './CustomerTypeSelector.module.css';

type CustomerTypeSelectorProps = {
  customerType: CustomerType;
  onChange(customerType: CustomerType): void;
};

export function CustomerTypeSelector({
  customerType,
  onChange,
}: CustomerTypeSelectorProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend>Customer type</legend>
      <div className={styles.copy}>
        <p>Pricing changes based on customer status.</p>
      </div>
      <div className={styles.control}>
        <button
          type="button"
          className={customerType === 'common' ? styles.active : undefined}
          aria-pressed={customerType === 'common'}
          onClick={() => onChange('common')}
        >
          Common
        </button>
        <button
          type="button"
          className={customerType === 'vip' ? styles.active : undefined}
          aria-pressed={customerType === 'vip'}
          onClick={() => onChange('vip')}
        >
          VIP
        </button>
      </div>
    </fieldset>
  );
}
