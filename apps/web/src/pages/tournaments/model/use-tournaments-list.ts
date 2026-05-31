import { useQuery } from '@tanstack/react-query';

import { useApiClient } from '@/shared/api';
import type { ApiClient } from '@/shared/api/client';
import { DEFAULT_LIST_STALE_MS } from '@/shared/api/query-config';

type FindAllArgs = Parameters<ApiClient['tournaments']['findAll']>[0];

export function useTournamentsList(args?: FindAllArgs) {
  const tournaments = useApiClient('tournaments');

  return useQuery({
    queryKey: [tournaments.findAll.path, args ?? null],
    queryFn: () => tournaments.findAll(args),
    staleTime: DEFAULT_LIST_STALE_MS,
  });
}
