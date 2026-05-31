import { useContext } from 'react';

import { ApiClientContext, createApiHooks, getByPath } from '../../lib/init-client-api';

import type { ApiClient } from './contracts';
import { STUB_API_CLIENT } from './stub-client';
import type { ApiClientKey, ApiHooks, GetApiClientType } from './types';

const ApiClientContextTyped = ApiClientContext as React.Context<ApiClient | null>;

interface ApiClientProviderProps {
  children: React.ReactNode;
  clients: ApiClient;
}

export function ApiClientProvider({ children, clients }: ApiClientProviderProps) {
  return (
    <ApiClientContext.Provider value={clients}>
      {children}
    </ApiClientContext.Provider>
  );
}

export function useApiClient<Path extends ApiClientKey>(
  path: Path,
): GetApiClientType<Path> {
  const clients = useContext(ApiClientContextTyped);
  const source = clients ?? STUB_API_CLIENT;
  return getByPath(source as unknown as Record<string, unknown>, path) as GetApiClientType<Path>;
}

export const apiHooks = createApiHooks(
  STUB_API_CLIENT as unknown as Record<string, unknown>,
  (path: string) => useApiClient(path as ApiClientKey),
) as ApiHooks;
