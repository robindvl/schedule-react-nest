import { useEffect } from 'react';

import { useApiClient } from '@/shared/api';
import { pageStyles } from '@/shared/ui/page';

export function TournamentsPage() {
  const tournaments = useApiClient('tournaments');

  useEffect(() => {
    void tournaments.findAll().then((data) => console.log('Tournaments:', data));
  }, [tournaments]);

  return (
    <section className={pageStyles.page}>
      <h1 className={pageStyles.title}>Турниры</h1>
    </section>
  );
}
