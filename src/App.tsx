import styles from './App.module.css';

export function App() {
  return (
    <main className={styles.shell}>
      <section className={styles.panel} aria-labelledby="app-title">
        <p className={styles.kicker}>Navalia tech challenge</p>
        <h1 id="app-title">Shopping Cart Pricing Simulator</h1>
        <p className={styles.description}>
          React, TypeScript, Vite, TanStack Query, Zustand, and a pricing domain
          ready for the next implementation phase.
        </p>
      </section>
    </main>
  );
}
