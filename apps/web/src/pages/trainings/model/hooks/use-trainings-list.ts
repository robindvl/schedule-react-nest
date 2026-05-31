import { useQuery } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import { DEFAULT_LIST_STALE_MS } from '@/shared/api/query-config';

export function useTrainingsList() {
  const trainings = useApiClient('trainings');

  return useQuery({
    queryKey: [trainings.findAll.path],
    queryFn: () => trainings.findAll(),
    staleTime: DEFAULT_LIST_STALE_MS,
  });
}
