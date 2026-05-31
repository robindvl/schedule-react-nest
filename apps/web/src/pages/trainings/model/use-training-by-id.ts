import { useQuery } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import { DEFAULT_LIST_STALE_MS } from '@/shared/api/query-config';

export function useTrainingById(id: string, options?: { enabled?: boolean }) {
  const trainings = useApiClient('trainings');

  return useQuery({
    queryKey: [trainings.findById.path, id],
    queryFn: () => trainings.findById({ id }),
    staleTime: DEFAULT_LIST_STALE_MS,
    enabled: options?.enabled ?? Boolean(id),
  });
}
