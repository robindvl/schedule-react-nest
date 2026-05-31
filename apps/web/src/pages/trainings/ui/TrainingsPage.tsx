import { useMemo } from 'react';

import { TournamentWidget } from '@/widgets/remote';

import { mapTrainingsToWidgetItems, useTrainingsList } from '../model';

export function TrainingsPage() {
  const { data: trainings, isLoading, isError, refetch } = useTrainingsList();

  const items = useMemo(
    () => (trainings ? mapTrainingsToWidgetItems(trainings) : undefined),
    [trainings],
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
    />
  );
}
