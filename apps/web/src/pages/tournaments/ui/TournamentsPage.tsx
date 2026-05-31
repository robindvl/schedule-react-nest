import { useCallback, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import { TournamentWidget } from '@/widgets/remote';

import {
  mapTournamentToDetailView,
  mapTournamentsToWidgetItems,
  useTournamentsList,
} from '../model';

export function TournamentsPage() {
  const queryClient = useQueryClient();
  const tournamentsApi = useApiClient('tournaments');
  const { data: tournaments, isLoading, isError, refetch } = useTournamentsList();

  const items = useMemo(
    () => (tournaments ? mapTournamentsToWidgetItems(tournaments) : undefined),
    [tournaments],
  );

  const handleLoadDetail = useCallback(
    async (id: string) => {
      const tournament = await queryClient.fetchQuery({
        queryKey: [tournamentsApi.findById.path, id],
        queryFn: () => tournamentsApi.findById({ id }),
      });

      return mapTournamentToDetailView(tournament);
    },
    [queryClient, tournamentsApi],
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
      onLoadDetail={handleLoadDetail}
    />
  );
}
