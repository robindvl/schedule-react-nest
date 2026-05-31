import type { ReactNode } from 'react';

import type { ApiClient } from '@/shared/api/client';
import { ApiClientProvider as Provider } from '@/shared/api/client';

import { tournamentsApi, trainingsApi } from './core';

const clients: ApiClient = {
  trainings: trainingsApi,
  tournaments: tournamentsApi,
};

export function ApiClientProvider({ children }: { children: ReactNode }) {
  return <Provider clients={clients}>{children}</Provider>;
}
