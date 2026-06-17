import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';

describe('App', () => {
  it('renders the challenge title', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    expect(
      await screen.findByRole('heading', {
        name: /shopping cart pricing simulator/i,
      }),
    ).toBeInTheDocument();
  });
});
