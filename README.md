# Shopping Cart Pricing Simulator

A React and TypeScript shopping cart simulator that compares pricing options based
on cart contents and customer type.

The app lets users browse a small product catalog, manage cart quantities, switch
between Common and VIP customers, and see the cheapest valid pricing option with
subtotal, savings, final total, and recommendation details.

## Features

- Product catalog with T-shirt, Jeans, and Dress.
- Add, remove, increase, and decrease cart items.
- Common and VIP customer selection.
- Subtotal, savings, final total, and promotion comparison.
- Automatic recommendation of the cheapest eligible pricing option.
- Responsive UI built with CSS Modules.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the test suite:

```bash
npm test
```

Build for production:

```bash
npm run build
```

## Project Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm test` | Runs the Vitest suite once. |
| `npm run test:watch` | Runs tests in watch mode. |
| `npm run build` | Type-checks and builds the production bundle. |

## Pricing Rules

### Products

| Product | Price |
| --- | ---: |
| T-shirt | `$35.99` |
| Jeans | `$65.50` |
| Dress | `$80.75` |

All monetary values are stored and calculated in cents to avoid floating-point
precision issues.

### Get 3 for 2

For every 3 items in the cart, the cheapest item is free.

This promotion applies across the entire cart, not per product type. For
example, if the cart has 2 T-shirts and 1 Jeans, the free item is one T-shirt.

### VIP Discount

VIP customers receive 15% off the cart subtotal.

The percentage discount is calculated in cents and rounded to the nearest cent at
the promotion calculation level.

### Promotion Recommendation

Promotions cannot be combined. The app calculates all eligible options and
recommends the option with the lowest final total.

If two options produce the same total, the deterministic tie-breaker is:

1. Get 3 for 2
2. VIP Discount
3. No promotion

## Expected Scenarios

| Scenario | Recommendation | Total |
| --- | --- | ---: |
| Common customer adds 3 T-shirts | Get 3 for 2 | `$71.98` |
| Common customer adds 2 T-shirts and 2 Jeans | Get 3 for 2 | `$166.99` |
| VIP customer adds 3 Dresses | Get 3 for 2 | `$161.50` |
| VIP customer adds 2 Jeans and 2 Dresses | Get 3 for 2 | `$227.00` |
| VIP customer adds 4 T-shirts and 1 Jeans | Get 3 for 2 | `$173.47` |

## Architecture

The project keeps business rules separate from React components so pricing logic
can be tested independently from the UI.

```text
src/
  assets/   Product images used by the local catalog
  domain/   Pure business rules, pricing, promotions, money, and cart types
  app/      Application hooks, fake product API, and client state store
  ui/       Pages, components, UI assets, and CSS Modules
  styles/   Global styles
  test/     Test setup
```

### Domain

`src/domain` contains pure TypeScript modules. It does not import React, browser
APIs, Zustand, TanStack Query, or CSS.

This layer owns:

- Product and cart types.
- Money formatting.
- Cart subtotal and quantity calculations.
- Promotion strategies.
- Pricing recommendation rules.

### App

`src/app` connects the UI to application data and state.

- TanStack Query is used for server state: the product catalog.
- Zustand is used for client state: cart items and selected customer type.
- Pricing rules are not stored in Zustand; they remain in the domain layer.

### UI

`src/ui` contains the React page, reusable components, assets, and component
styles. Components receive data and callbacks from the app layer and delegate
pricing decisions to domain functions.

## Testing

The test suite is split by responsibility:

- Domain tests cover pricing rules, promotion behavior, money formatting, and
  cart calculations.
- Store tests cover cart state transitions.
- App tests cover the main user flows with React Testing Library and
  user-event.

GitHub Actions runs tests and production build checks on the repository.

## Technical Decisions and Trade-offs

- Money is represented in cents throughout the domain layer to avoid
  floating-point precision issues.
- Promotions are implemented as isolated strategies, which keeps each pricing
  rule small, testable, and easy to compare.
- Promotion recommendation uses a deterministic tie-breaker: Get 3 for 2, then
  VIP Discount, then No promotion.
- VIP Discount is eligible only when the cart subtotal is greater than zero.
- The product catalog is modeled as server state through a local async API and
  TanStack Query.
- Cart items and selected customer type are modeled as client state with
  Zustand.

## Future Improvements

- Replace the fake product API with a real backend endpoint.
- Persist the cart if session continuity becomes a product requirement.
- Add E2E coverage for one or two critical browser flows.
- Add accessibility and visual regression checks for a production workflow.
