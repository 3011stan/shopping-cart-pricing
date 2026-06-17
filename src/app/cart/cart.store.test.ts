import { beforeEach, describe, expect, it } from 'vitest';
import type { Product } from '../../domain/product/product.types';
import { useCartStore } from './cart.store';

const T_SHIRT: Product = {
  id: 't-shirt',
  name: 'T-shirt',
  priceCents: 3599,
};

const JEANS: Product = {
  id: 'jeans',
  name: 'Jeans',
  priceCents: 6550,
};

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      customerType: 'common',
    });
  });

  it('starts with an empty cart and common customer type', () => {
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().customerType).toBe('common');
  });

  it('adds a new product to the cart', () => {
    useCartStore.getState().addItem(T_SHIRT);

    expect(useCartStore.getState().items).toEqual([
      {
        product: T_SHIRT,
        quantity: 1,
      },
    ]);
  });

  it('increases quantity when adding an existing product', () => {
    useCartStore.getState().addItem(T_SHIRT);
    useCartStore.getState().addItem(T_SHIRT);

    expect(useCartStore.getState().items).toEqual([
      {
        product: T_SHIRT,
        quantity: 2,
      },
    ]);
  });

  it('keeps cart items in insertion order', () => {
    useCartStore.getState().addItem(T_SHIRT);
    useCartStore.getState().addItem(JEANS);

    expect(useCartStore.getState().items.map((item) => item.product.id)).toEqual(
      ['t-shirt', 'jeans'],
    );
  });

  it('increases item quantity', () => {
    useCartStore.getState().addItem(T_SHIRT);
    useCartStore.getState().increaseQuantity('t-shirt');

    expect(useCartStore.getState().items[0]?.quantity).toBe(2);
  });

  it('decreases item quantity down to 1', () => {
    useCartStore.getState().addItem(T_SHIRT);
    useCartStore.getState().increaseQuantity('t-shirt');
    useCartStore.getState().decreaseQuantity('t-shirt');
    useCartStore.getState().decreaseQuantity('t-shirt');

    expect(useCartStore.getState().items[0]?.quantity).toBe(1);
  });

  it('removes an item from the cart', () => {
    useCartStore.getState().addItem(T_SHIRT);
    useCartStore.getState().addItem(JEANS);
    useCartStore.getState().removeItem('t-shirt');

    expect(useCartStore.getState().items).toEqual([
      {
        product: JEANS,
        quantity: 1,
      },
    ]);
  });

  it('clears the cart without changing customer type', () => {
    useCartStore.getState().addItem(T_SHIRT);
    useCartStore.getState().changeCustomerType('vip');
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().customerType).toBe('vip');
  });

  it('changes customer type', () => {
    useCartStore.getState().changeCustomerType('vip');

    expect(useCartStore.getState().customerType).toBe('vip');
  });
});

