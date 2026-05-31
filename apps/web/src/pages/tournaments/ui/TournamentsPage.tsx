import { pageStyles } from '@/shared/ui/page';

import { useTournamentsList } from '../model';

export function TournamentsPage() {
  const { data: tournaments, isLoading, isError } = useTournamentsList();

  return (
    <section className={pageStyles.page}>
      <h1 className={pageStyles.title}>Турниры</h1>
      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Не удалось загрузить турниры</p>}
      {tournaments && <p>Загружено: {tournaments.length}</p>}
    </section>
  );
}
