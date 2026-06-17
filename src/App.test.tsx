import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './app/cart/cart.store';
import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      customerType: 'common',
    });
  });

  it('renders the product catalog', async () => {
    renderApp();

    expect(
      await screen.findByRole('heading', {
        name: /shopping cart pricing simulator/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /products/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText('T-shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
    expect(screen.getByText('Dress')).toBeInTheDocument();
    expect(screen.getByText('$35.99')).toBeInTheDocument();
    expect(screen.getByText('$65.50')).toBeInTheDocument();
    expect(screen.getByText('$80.75')).toBeInTheDocument();
    expect(screen.getByText('3 items available')).toBeInTheDocument();
  });

  it('adds a product to the cart and shows the pricing summary', async () => {
    const { user } = renderApp();

    await addProduct(user, 'T-shirt');

    const checkout = getCheckout();
    expect(within(checkout).getByText('T-shirt')).toBeInTheDocument();
    expect(getProductQuantity('T-shirt')).toHaveTextContent('1');
    expect(within(checkout).getByText('Subtotal')).toBeInTheDocument();
    expectCheckoutToShow('$35.99');
    expect(within(checkout).getByText('Final total')).toBeInTheDocument();
    expect(within(checkout).getAllByText('No promotion')).toHaveLength(2);
  });

  it('increases and decreases product quantity', async () => {
    const { user } = renderApp();

    await addProduct(user, 'T-shirt');

    const decreaseButton = screen.getByRole('button', {
      name: /decrease t-shirt quantity/i,
    });
    expect(decreaseButton).toBeDisabled();

    await user.click(
      screen.getByRole('button', { name: /increase t-shirt quantity/i }),
    );

    expect(getProductQuantity('T-shirt')).toHaveTextContent('2');
    expectCheckoutToShow('$71.98');
    expect(decreaseButton).toBeEnabled();

    await user.click(decreaseButton);

    expect(getProductQuantity('T-shirt')).toHaveTextContent('1');
    expect(decreaseButton).toBeDisabled();
  });

  it('removes a product from the cart', async () => {
    const { user } = renderApp();

    await addProduct(user, 'Jeans');
    await user.click(
      screen.getByRole('button', { name: /remove jeans from cart/i }),
    );

    const checkout = getCheckout();
    expect(within(checkout).queryByText('Jeans')).not.toBeInTheDocument();
    expect(within(checkout).getByText('Your cart is empty')).toBeInTheDocument();
    expect(
      within(checkout).queryByRole('heading', { name: /pricing summary/i }),
    ).not.toBeInTheDocument();
  });

  it('updates the recommendation when customer type changes to VIP', async () => {
    const { user } = renderApp();

    await addProduct(user, 'T-shirt');
    await user.click(screen.getByRole('button', { name: /vip/i }));

    const checkout = getCheckout();
    expect(within(checkout).getAllByText('VIP Discount')).toHaveLength(2);
    expect(within(checkout).getByText('-$5.40')).toBeInTheDocument();
    expectCheckoutToShow('$30.59');
    expect(
      within(checkout).getByText('VIP customers receive 15% off the subtotal.'),
    ).toBeInTheDocument();
  });

  it('recommends Get 3 for 2 when it is cheaper than the VIP discount', async () => {
    const { user } = renderApp();

    await addProduct(user, 'Dress');
    await addProduct(user, 'Dress');
    await addProduct(user, 'Dress');
    await user.click(screen.getByRole('button', { name: /vip/i }));

    const checkout = getCheckout();
    expect(within(checkout).getAllByText('Get 3 for 2')).toHaveLength(2);
    expect(within(checkout).getByText('VIP Discount')).toBeInTheDocument();
    expect(within(checkout).getAllByText('$161.50')).toHaveLength(2);
    expect(
      within(checkout).getByText(
        'The cheapest item in each group of three is free.',
      ),
    ).toBeInTheDocument();
  });

  it('shows a hint when Get 3 for 2 is not eligible yet', async () => {
    const { user } = renderApp();

    await addProduct(user, 'T-shirt');

    expect(
      within(getCheckout()).getByText(
        'Get 3 for 2 unlocks when the cart has at least 3 items.',
      ),
    ).toBeInTheDocument();
  });
});

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const user = userEvent.setup();

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );

  return { user };
}

async function addProduct(
  user: ReturnType<typeof userEvent.setup>,
  productName: string,
) {
  const addButton = await screen.findByRole('button', {
    name: new RegExp(`add ${productName} to cart`, 'i'),
  });

  await user.click(addButton);
}

function getCheckout() {
  return screen.getByRole('complementary', {
    name: /cart & pricing/i,
  });
}

function getProductQuantity(productName: string) {
  return within(
    screen.getByLabelText(new RegExp(`^${productName} quantity$`, 'i')),
  ).getByText(/\d+/);
}

function expectCheckoutToShow(text: string) {
  expect(within(getCheckout()).getAllByText(text).length).toBeGreaterThan(0);
}
