import { create } from 'zustand';
import type {
  CartItem,
  CustomerType,
} from '../../domain/cart/cart.types';
import type { Product } from '../../domain/product/product.types';

type CartState = {
  items: CartItem[];
  customerType: CustomerType;
  addItem(product: Product): void;
  removeItem(productId: Product['id']): void;
  increaseQuantity(productId: Product['id']): void;
  decreaseQuantity(productId: Product['id']): void;
  clearCart(): void;
  changeCustomerType(customerType: CustomerType): void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  customerType: 'common',
  addItem: (product) => {
    set((state) => {
      const hasItem = state.items.some(
        (item) => item.product.id === product.id,
      );

      if (!hasItem) {
        return {
          items: [...state.items, { product, quantity: 1 }],
        };
      }

      return {
        items: updateItemQuantity(
          state.items,
          product.id,
          (quantity) => quantity + 1,
        ),
      };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },
  increaseQuantity: (productId) => {
    set((state) => ({
      items: updateItemQuantity(
        state.items,
        productId,
        (quantity) => quantity + 1,
      ),
    }));
  },
  decreaseQuantity: (productId) => {
    set((state) => ({
      items: updateItemQuantity(
        state.items,
        productId,
        (quantity) => Math.max(1, quantity - 1),
      ),
    }));
  },
  clearCart: () => {
    set({ items: [] });
  },
  changeCustomerType: (customerType) => {
    set({ customerType });
  },
}));

function updateItemQuantity(
  items: CartItem[],
  productId: Product['id'],
  getQuantity: (quantity: number) => number,
): CartItem[] {
  return items.map((item) => {
    if (item.product.id !== productId) {
      return item;
    }

    return {
      ...item,
      quantity: getQuantity(item.quantity),
    };
  });
}
