import { useQuery } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import { DEFAULT_LIST_STALE_MS } from '@/shared/api/query-config';

export function useTournamentById(id: string, options?: { enabled?: boolean }) {
  const tournaments = useApiClient('tournaments');

  return useQuery({
    queryKey: [tournaments.findById.path, id],
    queryFn: () => tournaments.findById({ id }),
    staleTime: DEFAULT_LIST_STALE_MS,
    enabled: options?.enabled ?? Boolean(id),
  });
}
