import { useQuery } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import { DEFAULT_LIST_STALE_MS } from '@/shared/api/query-config';

export function useTrainingsList(date: string) {
  const trainings = useApiClient('trainings');

  return useQuery({
    queryKey: [trainings.findAll.path, date],
    queryFn: () => trainings.findAll({ date }),
    staleTime: DEFAULT_LIST_STALE_MS,
    enabled: Boolean(date),
  });
}
