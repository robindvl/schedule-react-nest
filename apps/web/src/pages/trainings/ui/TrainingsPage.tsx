import { useCallback, useMemo, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import { TournamentWidget } from '@/widgets/remote';

import {
  getTodayDateId,
  mapTrainingToDetailView,
  mapTrainingsToWidgetItems,
  useTrainingsList,
} from '../model';

export function TrainingsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const trainingsApi = useApiClient('trainings');
  const [scheduleDate, setScheduleDate] = useState(getTodayDateId);
  const { data: trainings, isLoading, isError, refetch } =
    useTrainingsList(scheduleDate);

  const items = useMemo(
    () => (trainings ? mapTrainingsToWidgetItems(trainings) : undefined),
    [trainings],
  );

  const handleLoadDetail = useCallback(
    async (id: string) => {
      const training = await queryClient.fetchQuery({
        queryKey: [trainingsApi.findById.path, id],
        queryFn: () => trainingsApi.findById({ id }),
      });

      return mapTrainingToDetailView(training);
    },
    [queryClient, trainingsApi],
  );

  const handleDateChange = useCallback((dateId: string) => {
    setScheduleDate(dateId);
  }, []);

  if (isLoading) {
    return <p>Загрузка…</p>;
  }

  if (isError) {
    return <p>Не удалось загрузить тренировки</p>;
  }

  if (!items) {
    return null;
  }

  return (
    <TournamentWidget
      activeSection="trainings"
      onSectionChange={(section) => {
        void navigate({ to: section === 'trainings' ? '/trainings' : '/tournaments' });
      }}
      items={items}
      onRefresh={() => refetch()}
      onDateChange={handleDateChange}
      onLoadDetail={handleLoadDetail}
    />
  );
}
