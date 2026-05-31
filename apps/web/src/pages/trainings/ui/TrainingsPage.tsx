import { useCallback, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import { TournamentWidget } from '@/widgets/remote';

import {
  mapTrainingToDetailView,
  mapTrainingsToWidgetItems,
  useTrainingsList,
} from '../model';

export function TrainingsPage() {
  const queryClient = useQueryClient();
  const trainingsApi = useApiClient('trainings');
  const { data: trainings, isLoading, isError, refetch } = useTrainingsList();

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
      title="Тренировки и игры"
      items={items}
      onRefresh={() => refetch()}
      onLoadDetail={handleLoadDetail}
    />
  );
}
