import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the challenge title', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /shopping cart pricing simulator/i,
      }),
    ).toBeInTheDocument();
  });
});
