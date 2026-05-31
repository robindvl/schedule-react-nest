import { pageStyles } from '@/shared/ui/page';

import { useTrainingsList } from '../model';

export function TrainingsPage() {
  const { data: trainings, isLoading, isError } = useTrainingsList();

  return (
    <section className={pageStyles.page}>
      <h1 className={pageStyles.title}>Тренировки и игры</h1>
      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Не удалось загрузить тренировки</p>}
      {trainings && <p>Загружено: {trainings.length}</p>}
    </section>
  );
}
