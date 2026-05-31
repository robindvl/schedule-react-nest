import { useCallback, useMemo, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import { TournamentWidget } from '@/widgets/remote';
import { getTodayDateId } from '@/pages/trainings/model/get-today-date-id';

import {
  mapTournamentToDetailView,
  mapTournamentsToWidgetItems,
  useTournamentsList,
} from '../model';

export function TournamentsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const tournamentsApi = useApiClient('tournaments');
  const [scheduleDate, setScheduleDate] = useState(getTodayDateId);
  const { data: tournaments, isLoading, isError, isFetching, refetch } =
    useTournamentsList({
      date: scheduleDate,
    });

  const items = useMemo(
    () => mapTournamentsToWidgetItems(tournaments ?? []),
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

  const handleDateChange = useCallback((dateId: string) => {
    setScheduleDate(dateId);
  }, []);

  if (isError && !tournaments) {
    return <p>Не удалось загрузить турниры</p>;
  }

  return (
    <TournamentWidget
      activeSection="tournaments"
      onSectionChange={(section) => {
        void navigate({ to: section === 'trainings' ? '/trainings' : '/tournaments' });
      }}
      items={items}
      selectedDateId={scheduleDate}
      loading={isLoading || isFetching}
      onRefresh={() => refetch()}
      onDateChange={handleDateChange}
      onLoadDetail={handleLoadDetail}
    />
  );
}
