import { useEffect } from 'react';

import { useApiClient } from '@/shared/api';
import { pageStyles } from '@/shared/ui/page';

export function TrainingsPage() {
  const trainings = useApiClient('trainings');

  useEffect(() => {
    void trainings.findAll().then((data) => console.log('Trainings:', data));
  }, [trainings]);

  return (
    <section className={pageStyles.page}>
      <h1 className={pageStyles.title}>Тренировки и игры</h1>
    </section>
  );
}
