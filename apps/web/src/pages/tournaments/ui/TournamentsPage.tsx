import { useMemo } from 'react';

import { TournamentWidget } from '@/widgets/remote';

import { mapTournamentsToWidgetItems, useTournamentsList } from '../model';

export function TournamentsPage() {
  const { data: tournaments, isLoading, isError, refetch } = useTournamentsList();

  const items = useMemo(
    () => (tournaments ? mapTournamentsToWidgetItems(tournaments) : undefined),
    [tournaments],
  );

  if (isLoading) {
    return <p>Загрузка…</p>;
  }

  if (isError) {
    return <p>Не удалось загрузить турниры</p>;
  }

  if (!items) {
    return null;
  }

  return (
    <TournamentWidget
      title="Запись на турниры"
      items={items}
      onRefresh={() => refetch()}
    />
  );
}
