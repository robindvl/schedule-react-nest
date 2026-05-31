import { Link, Outlet } from '@tanstack/react-router';

import styles from './AppLayout.module.css';

const navItems = [
  { to: '/trainings', label: 'Тренировки и игры' },
  { to: '/tournaments', label: 'Турниры' },
] as const;

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Основное меню">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={styles.link}
              activeProps={{
                className: `${styles.link} ${styles.linkActive}`,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
